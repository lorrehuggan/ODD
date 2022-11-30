import { router } from "../trpc";
import { authRouter } from "./auth";
import { dashboardRouter } from "./dashboard";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  dashboard: dashboardRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
