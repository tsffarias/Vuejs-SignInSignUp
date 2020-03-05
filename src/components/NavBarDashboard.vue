<template>
  <nav>
    <v-app-bar app color="#ffffff" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="black--text"></v-app-bar-nav-icon>
      <a href="/dashboard" class="removeUnderline">
        <div class="d-flex align-center">
          <v-icon large class="grey--text">mdi-shield-lock</v-icon>
          <v-toolbar-title class="text-uppercase black--text">
            <span class="font-weight-light ml-2">Open</span>
            <span>Auth</span>
          </v-toolbar-title>
        </div>
      </a>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex d-sm-none d-md-flex">
        <v-menu :open-on-hover="openOnHover" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on" text>
              <v-icon left class="black--text">mdi-chevron-down</v-icon>
              <span class="black--text">Menu</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(link,idx) in userlinks" :key="idx" :to="link.route">
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <div v-if="this.permissions.admin">
              <v-list-item v-for="(link,idx) in adminLinks" :key="idx" :to="link.route">
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </div>

      <v-menu :open-on-hover="openOnHover" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on" text>
            <v-icon x-large color="grey">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list class="mb-4">
          <v-list-item to="profile">
            <v-list-item-icon>
              <v-icon class="dark--text">mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="user-settings">
            <v-list-item-icon>
              <v-icon class="dark--text">mdi-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="dark--text">Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="loggedIn" @click="logout">
            <v-list-item-icon>
              <v-icon class="dark--text">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="dark--text">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn to="/signup" v-if="!loggedIn" text>
        <span class="mr-2">Signup</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn to="/login" v-if="!loggedIn" text>
        <span class="mr-2">Login</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary class="#9652ff">
      <v-layout column align-center>
        <router-link to="profile" class="removeUnderline">
          <v-flex class="text-center mt-5 mb-4">
            <v-icon color="grey" size="110">mdi-account-circle</v-icon>
          </v-flex>
          <p v-if="!user" class="black--text subheading mt-3">User E-mail</p>
          <p v-if="user" class="black--text subheading mt-3">{{ user.displayName }}</p>
        </router-link>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <!-- Área para todos os usuários -->
        <div v-if="this.permissions.user || this.permissions.admin">
          <v-list-item v-for="link in userlinks" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon class="dark--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="dark--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <!-- Administrative area -->
        <div v-if="this.permissions.admin">
          <v-divider></v-divider>
          <v-subheader>Administrative area</v-subheader>

          <v-list-item v-for="link in adminLinks" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon class="dark--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="dark--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block tile @click="logout">
            Logout
            <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { auth } from "@/main";

export default {
  name: "NavBarDashboard",
  mounted() {
    if (localStorage.getItem("OpenAuth-user")) {
      this.user = JSON.parse(localStorage.getItem("OpenAuth-user") || "{}");
      this.permissions.admin = true;
      this.loggedIn = true;
    }
  },
  data() {
    return {
      drawer: false,
      user: null,
      loggedIn: false,
      openOnHover: true,
      permissions: {
        admin: false,
        user: false
      },
      userlinks: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" }
      ],
      adminLinks: [
        { icon: "mdi-account", text: "Users", route: "/users" },
        { icon: "mdi-file-document-box-search", text: "Logs", route: "/logs" },
        { icon: "mdi-settings", text: "Settings", route: "/admin-settings" }
      ]
    };
  },
  methods: {
    logout() {
      auth.signOut();
      localStorage.removeItem("emailVerificationSent");
      localStorage.removeItem("isAuthenticatedWithEmail");
      localStorage.removeItem("OpenAuth-user");
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style>
.removeUnderline {
  text-decoration: none;
}
</style>
