import Vue from "vue";
import Router from "vue-router";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");

// Users
const Users = () => import("@/views/users/Users");
const User = () => import("@/views/users/User");

const Condolences = () => import("@/views/condolences/Condolences");
const Condolence = () => import("@/views/condolences/Condolence");

const Tributes = () => import("@/views/tributes/Tributes");
const Tribute = () => import("@/views/tributes/Tribute");

Vue.use(Router);

function guardMyroute(to, from, next) {
  let isAuthenticated = false;

  if (localStorage.getItem("user")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/pages/login");
  }
}
export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/condolences",
      name: "Home",
      beforeEnter: guardMyroute,
      component: TheContainer,

      children: [
        {
          path: "registeruser",
          name: "Registrar Moderador",
          component: Dashboard,
        },

        {
          path: "users",

          meta: {
            label: "Moderadores",
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              name: "Moderadores",
              component: Users,
            },
            // {
            //   path: ":id",
            //   meta: {
            //     label: "Detalhes do moderador",
            //   },
            //   name: "User",
            //   component: User,
            // },
          ],
        },
        {
          path: "condolences",
          beforeEnter: guardMyroute,

          meta: {
            label: "Moderação de condolências",
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              name: "Moderação de condolências",
              component: Condolences,
            },
            {
              path: ":id",
              meta: {
                label: "Condolência",
              },
              name: "Condolência",
              component: Condolence,
            },
          ],
        },
        {
          path: "tributes",
          beforeEnter: guardMyroute,

          meta: {
            label: "Moderação de depoimentos",
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              name: "Moderação de depoimentos",
              component: Tributes,
            },
            {
              path: ":id",
              meta: {
                label: "Depoimentos",
              },
              name: "Depoimentos",
              component: Tribute,
            },
          ],
        },
      ],
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
      ],
    },
    {
      path: "**",
      redirect: "/pages/404",
      name: "Page404",
      component: Page404,
    },
  ];
}
