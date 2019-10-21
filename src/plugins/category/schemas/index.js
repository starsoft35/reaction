import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const addCategory = importAsString("./addCategory.graphql");
const productsByCategoryId = importAsString("./productsByCategoryId.graphql");
const removeCategory = importAsString("./removeCategory.graphql");
const setCategoryHeroMedia = importAsString("./setCategoryHeroMedia.graphql");
const category = importAsString("./category.graphql");
const categories = importAsString("./categories.graphql");
const updateCategory = importAsString("./updateCategory.graphql");

export default [
  addCategory,
  productsByCategoryId,
  removeCategory,
  setCategoryHeroMedia,
  category,
  categories,
  updateCategory
];
