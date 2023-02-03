import { createRouter, createWebHistory } from "vue-router";
import UserAuthentication from "../views/UserAuthentication.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "User Autherntication",
    component: UserAuthentication,
    children: [
      {
        path: "/sign-in-comp",
        name: "Sign In",
        component: () => import("../components/user-auth/SignInComp.vue"),
      },
      {
        path: "/sign-up-comp",
        name: "Sign Up",
        component: () => import("../components/user-auth/SignUpComp.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/edit-profile",
        name: "Edit Profile",
        component: () => import("../components/header_comp/EditProfile.vue"),
      },
      {
        path: "/question-List",
        name: "Question List",
        component: () => import("../components/quiz_comp/QuestionList.vue"),
        children: [
          {
            path: "/create-quiz",
            name: "Create Quiz",
            component: () => import("../components/quiz_comp/CQuiz.vue"),
          },
        ],
      },
      {
        path: "/create-subject",
        name: "Create Subject",
        component: () => import("../components/subj_comp/CSubject.vue"),
      },
      {
        path: "/change-subject",
        name: "Change Subject",
        component: () => import("../components/subj_comp/ChangeSubject.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
