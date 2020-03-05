import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  auth
} from "@/main";
// import * as firebase from "firebase/app";
// import "firebase/auth";
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const guardMyroute = (to, from, next) => {
  
  let isAuthenticated = false;
  
  auth.onAuthStateChanged(user => {
    if (user) {
      // Everything inside here happens if user is signed in
      
      // Happens if localStorage has info saying user is authenticated with email
      if (localStorage.getItem(`isAuthenticatedWithEmail`)) {
         isAuthenticated = true;
        // Happens if emailVerfied = false
        if (!user.emailVerified) {
          // Happens if emailVerificationSent = null
          if (!localStorage.getItem(`emailVerificationSent`)) {
            // Send verfication Email
            // user.sendEmailVerification().then(() => {
            //   localStorage.setItem(`emailVerificationSent`, `true`)
            // })
          } else {
            console.log(`Verification email has already been sent`);
          }
          console.log(`Email not verfied. Click the link inside the email we sent to ${user.email}`)
        }
      }
    } else {
      // Everything inside here happens if user is not signed in
      isAuthenticated = false;
    }

    if (isAuthenticated) {
      next(); // allow to enter route
    } else {
      localStorage.removeItem("isAuthenticatedWithEmail");
      localStorage.removeItem("OpenAuth-user");
      next('/'); // go to '/login';
    }
  })
  
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: guardMyroute,
    component: () => import( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
