const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/perfil",
        name: "perfil",
        component: () => import("pages/Perfil.vue"),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/agenda",
    name: "agenda",
    component: () => import("pages/Agendas.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
