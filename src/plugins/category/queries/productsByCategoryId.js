import ReactionError from "@reactioncommerce/reaction-error";
import arrayJoinPlusRemainingQuery from "@reactioncommerce/api-utils/arrayJoinPlusRemainingQuery.js";

/**
 * @name queries.productsByCategoryId
 * @method
 * @memberof Categories/Queries
 * @summary get a list of products by category id
 * @param {Object} context - an object containing the per-request state
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop ID
 * @param {String} [params.categoryId] - Category ID
 * @returns {Promise<Array<Object>>} array of CategoryProducts
 */
export default async function productsByCategoryId(context, params) {
  const { connectionArgs, shopId, categoryId } = params;
  const { collections, userHasPermission } = context;
  const { Products, Categories } = collections;

  // Check for owner or admin permissions from the user before allowing the query
  if (!userHasPermission(["owner", "admin", "category/admin", "category/edit"], shopId)) {
    throw new ReactionError("access-denied", "User does not have permission");
  }

  return arrayJoinPlusRemainingQuery({
    arrayFieldPath: "featuredProductIds",
    collection: Categories,
    connectionArgs,
    joinCollection: Products,
    joinFieldPath: "_id",
    joinSelector: { hashcategories: categoryId, shopId },
    joinSortOrder: "asc",
    positionFieldName: "position",
    selector: { _id: categoryId },
    sortByForRemainingDocs: "createdAt",
    sortOrderForRemainingDocs: "asc"
  });
}
