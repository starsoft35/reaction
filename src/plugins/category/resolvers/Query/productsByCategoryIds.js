import { decodeShopOpaqueId, decodeCategoryOpaqueId } from "../../xforms/id.js";

/**
 * @name Query.productsByCategoryIds
 * @method
 * @memberof Categories/GraphQL
 * @summary get a list of products by category ids
 * @param {Object} _ - unused
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop id
 * @param {String} [params.categoryId] - Category id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Array<Object>>} CategoryProducts Connection
 */
export default async function productsByCategoryIds(_, params, context) {
  const {
    after,
    before,
    first,
    last,
    offset,
    shopId: opaqueShopId,
    sortOrder,
    categoryIds: opaqueCategoryIds
  } = params;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const categoryIds = opaqueCategoryIds.map(decodeCategoryOpaqueId);

  return context.queries.productsByCategoryIds(context, {
    connectionArgs: {
      after,
      before,
      first,
      last,
      offset,
      sortOrder
    },
    shopId,
    categoryIds
  });
}
