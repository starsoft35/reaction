import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name queries.productsByCategoryIds
 * @method
 * @memberof Categories/Queries
 * @summary get a list of products by category ids
 * @param {Object} context - an object containing the per-request state
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop ID
 * @param {String} [params.categoryId] - Category ID
 * @returns {Promise<Array<Object>>} array of CategoryProducts
 */
export default async function productsByCategoryIds(context, params) {
  const { connectionArgs, shopId, categoryIds } = params;
  const { collections, userHasPermission } = context;
  const { CategoryProduct } = collections;

  // Check for owner or admin permissions from the user before allowing the query
  if (!userHasPermission(["owner", "admin", "category/admin", "category/edit"], shopId)) {
    throw new ReactionError("access-denied", "User does not have permission");
  }

  const pipeline = [
    {
      $match: {
        categoryId: {
          $in: categoryIds
        }
      }
    },
    {
      $lookup: {
        from: "Products",
        localField: "productId",
        foreignField: "_id",
        as: "categoryProducts"
      }
    },
    {
      $unwind: {
        path: "$categoryProducts"
      }
    },
    {
      $replaceRoot: {
        newRoot: "$categoryProducts"
      }
    },
    {
      $match: {}
    },
    {
      $skip: connectionArgs.offset
    },
    {
      $limit: connectionArgs.first
    }
  ];

  const nodes = await CategoryProduct.aggregate(pipeline).toArray();

  return {
    nodes
  };
}
