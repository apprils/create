import { createApp } from "vue";
import { createPinia } from "pinia";

import createRouter from "./router";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(createRouter());

app.mount("#app");
