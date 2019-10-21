import { decodeShopOpaqueId, decodeCategoryOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.setCategoryHeroMedia
 * @method
 * @memberof Categories/GraphQL
 * @summary Set hero media for a category
 * @param {Object} parentResult - unused
 * @param {Object} args.input - AddCategoryInput
 * @param {String} args.input.id - Category ID
 * @param {String} args.input.shopId - ShopId of the category
 * @param {Boolean} args.input.fileRecord - FileRecord document
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} SetCategoryHeroMediaPayload
 */
export default async function setCategoryHeroMedia(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    id: opaqueCategoryId,
    shopId: opaqueShopId,
    fileRecord
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const categoryId = decodeCategoryOpaqueId(opaqueCategoryId);

  const category = await context.mutations.setCategoryHeroMedia(context, {
    shopId,
    categoryId,
    fileRecord
  });

  return {
    clientMutationId,
    category
  };
}
