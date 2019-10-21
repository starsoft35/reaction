import { decodeShopOpaqueId, decodeCategoryOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.updateCategory
 * @method
 * @memberof Routes/GraphQL
 * @summary Update a specified redirect rule
 * @param {Object} parentResult - unused
 * @param {Object} args.input - UpdateCategoryInput
 * @param {String} args.input.name - path to redirect from
 * @param {String} args.input.displayName - path to redirect to
 * @param {Boolean} args.input.isVisible - whether the category is visible
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} UpdateCategoryPayload
 */
export default async function updateCategory(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    id: opaqueCategoryId,
    shopId: opaqueShopId,
    ...categoryInput
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const categoryId = decodeCategoryOpaqueId(opaqueCategoryId);

  const category = await context.mutations.updateCategory(context, {
    shopId,
    categoryId,
    ...categoryInput
  });

  return {
    clientMutationId,
    category
  };
}
