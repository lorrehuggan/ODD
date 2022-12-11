import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../../trpc";

export const company = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }
    return ctx.prisma.company.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  // create new company
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(2, {
            message: "Company name must be at least 2 characters",
          })
          .max(25, {
            message: "Company name must be at most 25 characters",
          }),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        return null;
      }
      return ctx.prisma.company.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
});
