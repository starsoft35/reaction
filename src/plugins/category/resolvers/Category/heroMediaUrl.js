/**
 * @name Category/heroMediaUrl
 * @method
 * @memberof Category/GraphQL
 * @summary Makes the URL absolute if it is relative
 * @param {Object} category - Category response from parent resolver
 * @param {SubCategoryConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @returns {String|null} The absolute URL
 */
export default function heroMediaUrl({ heroMediaUrl: url }, connectionArgs, context) {
  if (typeof url !== "string") return null;
  if (url.startsWith("http")) return url;
  return context.getAbsoluteUrl(url);
}
