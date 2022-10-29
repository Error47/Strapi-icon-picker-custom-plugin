import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";

const name = pluginPkg.strapi.name;
export default {
  register(app) {
    app.customFields.register({
      name: "picker",
      pluginId: "my-custom-fields",
      type: "string",
      intlLabel: {
        id: "InputField.label",
        defaultMessage: "my-custom-fields name",
      },
      intlDescription: {
        id: "InputField.description",
        defaultMessage: "Select",
      },
      components: {
        Input: async () => import("./components/IconPicker"),
      },
    });
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
