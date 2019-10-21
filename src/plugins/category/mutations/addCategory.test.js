import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import addCategory from "./addCategory.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.addCategory and returns the AddCategoryPayload on success", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(true);
  mockContext.collections.Categories.insertOne.mockReturnValueOnce({ result: { ok: 1 } });

  const input = {
    shopId: "1234",
    name: "shirt",
    displayTitle: "Shirt",
    isVisible: true
  };
  const result = await addCategory(mockContext, input);

  expect(result).toBeDefined();
  expect(mockContext.collections.Categories.insertOne).toHaveBeenCalled();
});

test("calls mutations.addCategory and throws for non admins", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(false);
  mockContext.collections.Categories.insertOne.mockReturnValueOnce({ result: { ok: 1 } });

  const result = addCategory(mockContext, {});
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Categories.insertOne).not.toHaveBeenCalled();
});
