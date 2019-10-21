/* eslint-disable id-length */
import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import updateCategory from "./updateCategory.js";

const testShopId = "1234";
const testCategoryId = "5678";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.updateCategory and returns the UpdateCategoryPayload on success", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(true);
  mockContext.collections.Categories.updateOne.mockReturnValueOnce({ result: { n: 1 } });
  mockContext.collections.Categories.findOne.mockReturnValueOnce({
    _id: "5678",
    shopId: "1234",
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  });

  const input = {
    input: {
      shopId: testShopId,
      categoryId: testCategoryId,
      isVisible: true,
      name: "shirts",
      displayTitle: "Shirts"
    }
  };
  const result = await updateCategory(mockContext, input);

  expect(result).toBeDefined();
  expect(mockContext.collections.Categories.updateOne).toHaveBeenCalled();
});

test("calls mutations.updateCategory and throws for non admins", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(false);
  mockContext.collections.Categories.updateOne.mockReturnValueOnce({ result: { n: 1 } });

  const result = updateCategory(mockContext, {});
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Categories.updateOne).not.toHaveBeenCalled();
});
