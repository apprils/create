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
    "noEmit": true,
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

