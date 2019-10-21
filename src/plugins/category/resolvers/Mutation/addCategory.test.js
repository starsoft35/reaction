import { encodeShopOpaqueId, encodeCategoryOpaqueId } from "../../xforms/id.js";
import addCategory from "./addCategory.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Mutation.addCategory and returns the AddCategoryPayload on success", async () => {
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
      addCategory: mockMutation
    }
  };

  const result = await addCategory(null, {
    input: {
      ...category,
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual({
    category: fakeResult,
    clientMutationId: "clientMutationId"
  });
});
