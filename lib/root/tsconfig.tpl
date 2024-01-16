{

  "extends": "@appril/dev/tsconfig.app.json",

  "include": [
    "**/*",
    "**/*.vue",
    "./env.d.ts"
  ],

  "exclude": [
    {{#project.sourceFolders}}
    "{{.}}",
    {{/project.sourceFolders}}
    "var"
  ],

  "compilerOptions": {
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      {{#project.sourceFolders}}
      "{{.}}/*": [ "{{.}}/*" ],
      {{/project.sourceFolders}}
      "~/*": [ "./*" ]
    },
    "types": [
      "node"
    ]
  }
}

