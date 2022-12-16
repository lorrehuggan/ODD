import { createCompanySchema } from "./../../../../utils/ZodSchema/company";
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
  // get all companies with shifts
  getFirstWithShifts: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }
    return ctx.prisma.company.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        shifts: true,
      },
    });
  }),
  // create new company
  create: protectedProcedure
    .input(createCompanySchema)
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        return null;
      }
      return ctx.prisma.company.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          role: input.role,
        },
      });
    }),
});
