import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import removeCategory from "./removeCategory.js";

const testShopId = "1234";
const testCategoryId = "5678";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.removeCategory and returns the RemoveCategoryPayload on success", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(true);
  mockContext.collections.Categories.deleteOne.mockReturnValueOnce({ result: { ok: 1 } });
  mockContext.collections.Categories.findOne.mockReturnValueOnce({
    shopId: testShopId,
    categoryId: testCategoryId
  });

  const input = {
    input: {
      shopId: testShopId,
      categoryId: testCategoryId
    }
  };
  const result = await removeCategory(mockContext, input);

  expect(result).toEqual({
    shopId: testShopId,
    categoryId: testCategoryId
  });
  expect(mockContext.collections.Categories.deleteOne).toHaveBeenCalled();
});

test("calls mutations.removeCategory and throws for non admins", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(false);
  mockContext.collections.Categories.deleteOne.mockReturnValueOnce({ result: { ok: 1 } });

  const result = removeCategory(mockContext, {});
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Categories.deleteOne).not.toHaveBeenCalled();
});
