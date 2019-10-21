import i18n from "./i18n/index.js";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import { Category } from "./simpleSchemas.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Categories",
    name: "reaction-categories",
    i18n,
    collections: {
      Categories: {
        name: "Categories",
        indexes: [
          // Create indexes. We set specific names for backwards compatibility
          // with indexes created by the aldeed:schema-index Meteor package.
          [{ name: 1 }, { name: "c2_name" }],
          [{ relatedCategoryIds: 1 }, { name: "c2_relatedCategoryIds" }],
          [{ shopId: 1 }, { name: "c2_shopId" }],
          [{ slug: 1 }, { unique: true }]
        ]
      }
    },
    version: "1.0.0",
    graphQL: {
      resolvers,
      schemas
    },
    mutations,
    queries,
    simpleSchemas: {
      Category
    },
    registry: [{
      label: "Categories",
      description: "Category Management",
      icon: "fa fa-category",
      name: "category/settings",
      provides: ["settings"],
      workflow: "coreCategoryWorkflow",
      template: "categorySettings",
      meta: {
        actionView: {
          dashboardSize: "md"
        }
      }
    }, {
      route: "category/admin",
      label: "Category Admin",
      permission: "categoryAdmin",
      name: "category/admin"
    }, {
      route: "category/edit",
      label: "Edit Category",
      permission: "categoryEdit",
      name: "category/edit"
    }]
  });
}
