
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import useEnvStore from "@/stores/env";

import "./_routes.d";
import _routes from "./_routes";

export default function() {

  const envStore = useEnvStore()

  const routes: RouteRecordRaw[] = []

  for (const { name, path, params, meta, component, options } of Object.values(_routes)) {
    routes.push({
      name,
      path: [ path, params ].join("/"),
      meta,
      component,
      beforeEnter: async () => {
        await envStore.$fetch(name as keyof typeof envStore.$state)
      },
      ...options,
    })
  }

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  return router

}

