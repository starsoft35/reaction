import { decodeShopOpaqueId, decodeCategoryOpaqueId } from "../../xforms/id.js";

/**
 * @name Query.productsByCategoryId
 * @method
 * @memberof Categories/GraphQL
 * @summary get a list of products by category id
 * @param {Object} _ - unused
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop id
 * @param {String} [params.categoryId] - Category id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Array<Object>>} CategoryProducts Connection
 */
export default async function productsByCategoryId(_, params, context) {
  const {
    after,
    before,
    first,
    last,
    shopId: opaqueShopId,
    sortOrder,
    categoryId: opaqueCategoryId
  } = params;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const categoryId = decodeCategoryOpaqueId(opaqueCategoryId);

  return context.queries.productsByCategoryId(context, {
    connectionArgs: {
      after,
      before,
      first,
      last,
      sortOrder
    },
    shopId,
    categoryId
  });
}
