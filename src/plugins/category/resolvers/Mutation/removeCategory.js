import { decodeShopOpaqueId, decodeCategoryOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.removeCategory
 * @method
 * @memberof Routes/GraphQL
 * @summary Remove a specified category
 * @param {Object} parentResult - unused
 * @param {Object} args.input - RemoveCategoryInput
 * @param {String} args.input.id - id of the category to remove
 * @param {String} args.input.shopId - shopId of the category to remove
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} RemoveCategoryPayload
 */
export default async function removeCategory(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    id: opaqueCategoryId,
    shopId: opaqueShopId
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const categoryId = decodeCategoryOpaqueId(opaqueCategoryId);

  const category = await context.mutations.removeCategory(context, {
    shopId,
    categoryId
  });

  return {
    clientMutationId,
    category
  };
}
