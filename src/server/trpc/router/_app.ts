import { shift } from "./dashboard/shift";
import { company } from "./dashboard/company";
import { router } from "../trpc";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  company,
  shift,
});

// export type definition of API
export type AppRouter = typeof appRouter;
