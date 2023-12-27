{

  "extends": "@appril/dev/tsconfig.src.json",

  "include": [
    "../env.d.ts",
    "**/*",
    "**/*.vue",
    "**/*.d.ts"
  ],

  "compilerOptions": {
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [ "../*" ],
      {{#aliases}}
      "{{src}}/*": [ "{{dst}}/*" ],
      {{/aliases}}
      "@/*": [ "./*" ]
    },
    "types": [
      "koa-bodyparser"
    ]
  }
}

