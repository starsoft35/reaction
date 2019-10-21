import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import categories from "./categories.js";

const mockShopId = "SHOP_ID";

beforeEach(() => {
  jest.resetAllMocks();
});

test("default - isVisible only, excludes isDeleted", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId);
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("explicit - isVisible only, excludes not isVisible", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { shouldIncludeInvisible: false });
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("explicit - isVisible only, excludes isDeleted", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { shouldIncludeDeleted: false });
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("explicit - isVisible only, excludes isDeleted and not isVisible", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { shouldIncludeInvisible: false, shouldIncludeDeleted: false });
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("top-level only", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { isTopLevel: true });
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isTopLevel: true, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("non-top-level only", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { isTopLevel: false });
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isTopLevel: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("include isDeleted", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { shouldIncludeDeleted: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith(["owner", "admin"], mockShopId);
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockShopId, isVisible: true, isDeleted: { $in: [false, true] } });
  expect(result).toBe("CURSOR");
});

test("top-level only, include isDeleted", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { isTopLevel: true, shouldIncludeDeleted: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith(["owner", "admin"], mockShopId);
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({
    shopId: mockShopId, isTopLevel: true, isVisible: true, isDeleted: { $in: [false, true] }
  });
  expect(result).toBe("CURSOR");
});

test("non-top-level only, include isDeleted", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { isTopLevel: false, shouldIncludeDeleted: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith(["owner", "admin"], mockShopId);
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({
    shopId: mockShopId, isTopLevel: false, isVisible: true, isDeleted: { $in: [false, true] }
  });
  expect(result).toBe("CURSOR");
});

test("include not visible - by an admin", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockContext.shopId, { shouldIncludeInvisible: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith(["owner", "admin"], mockContext.shopId);
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({ shopId: mockContext.shopId, isDeleted: false, isVisible: { $in: [false, true] } });
  expect(result).toBe("CURSOR");
});

test("include not visible and only topLevel - by an admin", async () => {
  mockContext.collections.Categories.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await categories(mockContext, mockShopId, { shouldIncludeInvisible: true, isTopLevel: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith(["owner", "admin"], mockShopId);
  expect(mockContext.collections.Categories.find).toHaveBeenCalledWith({
    shopId: mockShopId, isDeleted: false, isTopLevel: true, isVisible: { $in: [false, true] }
  });
  expect(result).toBe("CURSOR");
});
