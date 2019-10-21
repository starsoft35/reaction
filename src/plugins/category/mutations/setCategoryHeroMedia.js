import { createRequire } from "module";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

const require = createRequire(import.meta.url);

const { FileRecord } = require("@reactioncommerce/file-collections");

/**
 * @name category/setCategoryHeroMedia
 * @method
 * @memberof Category/Methods
 * @summary Insert a new hero media record and attach it to a category.
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - mutation input
 * @returns {Promise<Object>} SetCategoryHeroMediaPayload
 */
export default async function setCategoryHeroMedia(context, input) {
  const { appEvents, collections, userHasPermission } = context;
  const { Media, MediaRecords, Categories } = collections;
  const { shopId, categoryId, fileRecord } = input;

  // Check for owner or admin permissions from the user before allowing the mutation
  if (!userHasPermission(["owner", "admin"], shopId)) {
    throw new ReactionError("access-denied", "User does not have permission");
  }

  let heroMediaUrl = null;

  if (fileRecord) {
    const doc = {
      ...fileRecord,
      _id: Random.id(),
      metadata: {
        ...fileRecord.metadata,
        workflow: "published"
      }
    };

    const { insertedId } = await MediaRecords.insertOne(doc);

    // Because we don't have access to the URL of the file, we have to
    // do our best to get the URL as it will be once the file is finished being processed.
    heroMediaUrl = `${FileRecord.downloadEndpointPrefix}/${Media.name}/${insertedId}/large/${fileRecord.original.name}`;
  }

  const { result } = await Categories.updateOne({
    _id: categoryId
  }, {
    $set: {
      heroMediaUrl
    }
  });

  if (result.n === 0) {
    throw new ReactionError("not-found", `Hero media couldn't be updated on category ${categoryId}`);
  }

  const category = await Categories.findOne({ _id: categoryId, shopId });

  appEvents.emit("afterSetCategoryHeroMedia", category);

  return category;
}
