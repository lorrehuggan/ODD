import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const dashboardRouter = router({
  // get user details
  getUser: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  // get user's companies
  getCompanies: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }
    return ctx.prisma.company.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
