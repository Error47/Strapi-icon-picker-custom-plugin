"use strict";

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "picker",
    plugin: "my-custom-fields",
    type: "string",
  });
};
