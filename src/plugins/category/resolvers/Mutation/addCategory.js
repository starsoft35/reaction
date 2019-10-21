import { decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.addCategory
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a category
 * @param {Object} parentResult - unused
 * @param {Object} args.input - AddCategoryInput
 * @param {String} args.input.name - path to redirect from
 * @param {String} args.input.displayName - path to redirect to
 * @param {Boolean} args.input.isVisible - whether the category is visible
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} AddCategoryPayload
 */
export default async function addCategory(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    shopId: opaqueShopId,
    ...categoryInput
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);

  const category = await context.mutations.addCategory(context, {
    shopId,
    ...categoryInput
  });

  return {
    clientMutationId,
    category
  };
}
