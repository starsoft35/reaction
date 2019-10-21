import { decodeCategoryOpaqueId } from "../../xforms/id.js";

/**
 * Arguments passed by the client for a categories query
 * @typedef {ConnectionArgs} CategoryConnectionArgs - An object of all arguments that were sent by the client
 * @memberof Category/GraphQL
 * @property {ConnectionArgs} args - An object of all arguments that were sent by the client. {@link ConnectionArgs|See default connection arguments}
 * @property {String} args.slugOrId - ID or slug of category to query
 * @property {Boolean} args.shouldIncludeInvisible - Whether or not to include `isVisible=true` categories. Default is `false`
 */

/**
 * @name Query/category
 * @method
 * @memberof Category/GraphQL
 * @summary Returns a category for a shop, based on category slug or ID
 * @param {Object} _ - unused
 * @param {Object} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object[]>} Promise that resolves with array of Category objects
 */
export default async function category(_, connectionArgs, context) {
  const { slugOrId } = connectionArgs;

  let dbCategoryId;

  try {
    dbCategoryId = decodeCategoryOpaqueId(slugOrId);
  } catch (error) {
    dbCategoryId = slugOrId;
  }

  return context.queries.category(context, dbCategoryId, connectionArgs);
}
