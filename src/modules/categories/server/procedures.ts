import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      pagination: false, // load all
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });
    return categories;
  }),
});
