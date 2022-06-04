const StyleDictionary = require("style-dictionary");

const platformsCSS = {
   transforms: [
      "attribute/cti",
      "name/cti/kebab",
      "time/seconds",
      "content/icon",
      "size/rem",
      "color/hex8",
   ],
   buildPath: "./src/styles/tokens/",
   prefix: "token",
};

const defaultStyleDictionary = StyleDictionary.extend({
   source: ["./src/styles/properties/*.json"],
   platforms: {
      css: {
         ...platformsCSS,
         files: [
            {
               destination: "default.scss",
               format: "css/variables",
               options: {
                  outputReferences: true,
               },
            },
         ],
      },
   },
});
defaultStyleDictionary.cleanAllPlatforms();
defaultStyleDictionary.buildAllPlatforms();
