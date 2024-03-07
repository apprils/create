{

  "extends": "@appril/tsconfig/app-vue.json",

  "include": [
    "../**/*.d.ts",
    "**/*.ts",
    "**/*.vue"
  ],

  "exclude": [
    {{#excludedSourceFolders}}
    {{.}}
    {{/excludedSourceFolders}}
  ],

  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": [ "../*" ],
      "@/*": [ "./*"  ],
      {{#aliases}}
      {{.}}
      {{/aliases}}
    },
    "types": [
      "koa-bodyparser"
    ]
  }
}

