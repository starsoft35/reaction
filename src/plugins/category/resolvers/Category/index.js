import { encodeCategoryOpaqueId } from "../../xforms/id.js";
import heroMediaUrl from "./heroMediaUrl.js";
import subCategories from "./subCategories.js";

export default {
  _id: (category) => encodeCategoryOpaqueId(category._id),
  heroMediaUrl,
  subCategoryIds: (category) => (category.relatedCategoryIds || []).map(encodeCategoryOpaqueId),
  subCategories
};
