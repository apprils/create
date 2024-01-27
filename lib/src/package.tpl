{
  "devPort": {{devPort}},
  "apiPort": {{apiPort}},
  "scripts": {
    "vite": "node --env-file=../.env --trace-deprecation --enable-source-maps $(which vite) $*",
    "dev": "npm run vite",
    "build": "npm run vite build",
    "//✨ trailing entry": ""
  }
}
