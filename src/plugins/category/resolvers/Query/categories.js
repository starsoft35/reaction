import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * Arguments passed by the client for a categories query
 * @typedef {ConnectionArgs} CategoryConnectionArgs - An object of all arguments that were sent by the client
 * @memberof Category/GraphQL
 * @property {ConnectionArgs} args - An object of all arguments that were sent by the client. {@link ConnectionArgs|See default connection arguments}
 * @property {Boolean} args.shouldIncludeDeleted - If set to true, include deleted. Default false.
 * @property {Boolean} ags.shouldIncludeInvisible - If set to true, include invisible. Default false.
 * @property {Boolean} args.isTopLevel - If set to a boolean, filter by this.
 * @property {String} args.shopId - The ID of shop to filter categories by
 * @property {Number} args.sortBy - Sort results by a CategorySortByField enum value of `_id`, `name`, `position`, `createdAt`, `updatedAt`
 */

/**
 * @name Query/categories
 * @method
 * @memberof Category/GraphQL
 * @summary Returns the categories for a shop
 * @param {Object} _ - unused
 * @param {CategoryConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Category objects
 */
export default async function categories(_, connectionArgs, context, info) {
  const { shopId } = connectionArgs;

  const dbShopId = decodeShopOpaqueId(shopId);

  const query = await context.queries.categories(context, dbShopId, connectionArgs);

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
