import getFakeMongoCursor from "@reactioncommerce/api-utils/tests/getFakeMongoCursor.js";
import categoriesResolver from "./categories.js";

const base64ID = "cmVhY3Rpb24vc2hvcDoxMjM="; // reaction/shop:123

const mockCategories = [
  { _id: "a1", name: "Men" },
  { _id: "b2", name: "Women" },
  { _id: "c3", name: "Children" }
];

const mockCategoriesQuery = getFakeMongoCursor("Categories", mockCategories);

test("calls queries.categories and returns a partial connection", async () => {
  const categories = jest.fn().mockName("queries.categories").mockReturnValueOnce(Promise.resolve(mockCategoriesQuery));

  const result = await categoriesResolver({ _id: base64ID }, {}, {
    queries: { categories }
  }, { fieldNodes: [] });

  expect(result).toEqual({
    nodes: mockCategories,
    pageInfo: {
      endCursor: "c3",
      startCursor: "a1"
    },
    totalCount: null
  });

  expect(categories).toHaveBeenCalled();
  expect(categories.mock.calls[0][1]).toBe("123");
});
