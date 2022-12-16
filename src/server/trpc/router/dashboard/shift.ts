import {
  createShiftSchema,
  updateShiftSchema,
} from "./../../../../utils/ZodSchema/shift";
import { z } from "zod";
import { router, protectedProcedure } from "../../trpc";

export const shift = router({
  getAll: protectedProcedure
    .input(
      z.object({
        companyId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      if (!ctx.session?.user) {
        return null;
      }
      return ctx.prisma.shift.findMany({
        where: {
          companyId: input.companyId,
        },
      });
    }),
  // create new shift
  create: protectedProcedure
    .input(createShiftSchema)
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        return null;
      }
      return ctx.prisma.shift.create({
        data: {
          companyId: input.companyId,
          start: input.start,
          end: input.end,
          earnings: input.earnings,
          date: input.date,
        },
      });
    }),
  // delete shift
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        return null;
      }
      return ctx.prisma.shift.delete({
        where: {
          id: input.id,
        },
      });
    }),
  // update shift
  update: protectedProcedure
    .input(updateShiftSchema)
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        return null;
      }
      return ctx.prisma.shift.update({
        where: {
          id: input.id,
        },
        data: {
          start: input.start,
          end: input.end,
          earnings: input.earnings,
          date: input.date,
        },
      });
    }),
});
