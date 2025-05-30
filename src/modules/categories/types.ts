import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type Category =
  inferRouterOutputs<AppRouter>["categories"]["getMany"]["docs"][number];
