import { encodeShopOpaqueId, encodeCategoryOpaqueId } from "../../xforms/id.js";
import removeCategory from "./removeCategory.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Mutation.removeCategory and returns the RemoveCategoryPayload on success", async () => {
  const shopId = encodeShopOpaqueId("s1");
  const categoryId = encodeCategoryOpaqueId("t1");
  const category = {
    name: "shirt",
    displayTitle: "Shirt"
  };

  const fakeResult = { _id: categoryId, shopId, ...category };
  const mockMutation = jest.fn().mockName("mutations.addCategory");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));

  const context = {
    mutations: {
      removeCategory: mockMutation
    }
  };

  const result = await removeCategory(null, {
    input: {
      shopId,
      categoryId,
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual({
    category: fakeResult,
    clientMutationId: "clientMutationId"
  });
});
