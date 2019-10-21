import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Shop/categories
 * @method
 * @memberof Shop/GraphQL
 * @summary Returns the categories for the parent resolver shop
 * @param {Object} _ - unused
 * @param {CategoryConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Category objects
 */
export default async function categories({ _id }, connectionArgs, context, info) {
  const dbShopId = decodeShopOpaqueId(_id);

  const query = await context.queries.categories(context, dbShopId, connectionArgs);

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
