import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name Mutation.removeCategory
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a category
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - mutation input
 * @returns {Promise<Object>} RemoveCategoryPayload
 */
export default async function removeCategory(context, input) {
  const { shopId, categoryId } = input;
  const { userHasPermission } = context;
  const { Categories } = context.collections;

  // Check for owner or admin permissions from the user before allowing the mutation
  if (!userHasPermission(["owner", "admin"], shopId)) {
    throw new ReactionError("access-denied", "User does not have permission");
  }

  const category = await Categories.findOne({ _id: categoryId, shopId });
  const { result } = await Categories.deleteOne({ _id: categoryId, shopId });

  if (result.n === 0) {
    throw new ReactionError("not-found", "Category not found");
  }

  return category;
}
