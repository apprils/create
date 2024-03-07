{

  "extends": "@appril/tsconfig/app.json",

  "include": [
    "**/*.ts",
    "**/*.vue"
  ],

  "exclude": [
    "var",
    {{#excludedSourceFolders}}
    {{.}}
    {{/excludedSourceFolders}}
  ],

  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": [ "./*" ],
      {{#aliases}}
      {{.}}
      {{/aliases}}
    },
    "types": [
      "node"
    ]
  }
}

