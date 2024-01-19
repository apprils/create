{

  "extends": "@appril/dev/tsconfig.app.json",

  "include": [
    "**/*.d.ts",
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

