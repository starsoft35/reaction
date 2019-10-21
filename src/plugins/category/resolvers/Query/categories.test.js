import categoriesResolver from "./categories.js";
import getFakeMongoCursor from "@reactioncommerce/api-utils/tests/getFakeMongoCursor.js";
import Factory from "/tests/util/factory.js";

const base64ID = "cmVhY3Rpb24vc2hvcDoxMjM="; // reaction/shop:123
const mockCategories = Factory.Category.makeMany(3, { _id: (newId) => (newId + 100).toString() });
const mockCategoriesQuery = getFakeMongoCursor("Categories", mockCategories);

test("calls queries.categories and returns a partial connection", async () => {
  const categories = jest
    .fn()
    .mockName("queries.categories")
    .mockReturnValueOnce(Promise.resolve(mockCategoriesQuery));

  const result = await categoriesResolver(
    {},
    { shopId: base64ID },
    {
      queries: { categories }
    },
    { fieldNodes: [] }
  );

  expect(result).toEqual({
    nodes: mockCategories,
    pageInfo: {
      endCursor: "102",
      startCursor: "100"
    },
    totalCount: null
  });

  expect(categories).toHaveBeenCalled();
  expect(categories.mock.calls[0][1]).toBe("123");
});
