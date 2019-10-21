import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import xformArrayToConnection from "@reactioncommerce/api-utils/graphql/xformArrayToConnection.js";

/**
 * Arguments passed by the client for a categories query
 * @memberof Category/GraphQL
 * @typedef {ConnectionArgs} SubCategoryConnectionArgs - An object of all arguments that were sent by the client
 * @property {ConnectionArgs} args - An object of all arguments that were sent by the client. {@link ConnectionArgs|See default connection arguments}
 * @property {Boolean} args.shouldIncludeDeleted - If set to true, include deleted. Default false.
 * @property {Number} args.sortBy - Sort results by a CategorySortByField enum value of `_id`, `name`, `position`, `createdAt`, `updatedAt`
 */

/**
 * @name Category/subCategories
 * @method
 * @memberof Category/GraphQL
 * @summary Returns the child categories for a category
 * @param {Object} category - Category response from parent resolver
 * @param {SubCategoryConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Category objects
 */
export default async function subCategories({ relatedCategoryIds }, connectionArgs, context, info) {
  if (!relatedCategoryIds || relatedCategoryIds.length === 0) return xformArrayToConnection(connectionArgs, []);

  const query = await context.queries.categoriesByIds(context, relatedCategoryIds, connectionArgs);

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
