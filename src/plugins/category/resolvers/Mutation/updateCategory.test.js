import { encodeShopOpaqueId, encodeCategoryOpaqueId } from "../../xforms/id.js";
import updateCategory from "./updateCategory.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Mutation.updateCategory and returns the UpdateCategoryPayload on success", async () => {
  const shopId = encodeShopOpaqueId("s1");
  const categoryId = encodeCategoryOpaqueId("t1");
  const category = {
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  };

  const fakeResult = { _id: categoryId, shopId, ...category };
  const mockMutation = jest.fn().mockName("mutations.updateCategory");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));

  const context = {
    mutations: {
      updateCategory: mockMutation
    }
  };

  const result = await updateCategory(null, {
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
