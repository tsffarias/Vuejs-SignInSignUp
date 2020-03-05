<template>
  <v-content>
    <NavBarDashboard />

    <v-container class="profile">
      <v-card class="mx-auto text-center" max-width="800">
        <v-card-text>
          <v-layout column align-center>
            <v-flex class="mt-5 mb-4">
              <template>
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card style="border-radius:60px">
                      <v-icon v-if="user.photoURL == ''" color="grey" size="110">mdi-account-circle</v-icon>

                      <v-avatar style="border-radius:60px" size="100">
                        <img :src="user.photoURL">
                      </v-avatar>

                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="grey">
                          
                          <v-btn text icon large @click="uploadPicture"><v-icon large>mdi-camera</v-icon></v-btn>
                          
                        </v-overlay>
                        <v-overlay v-if="loading" absolute color="primary">
                          <v-btn text icon large :loading="loading"></v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
              </template>
            </v-flex>
            <p class="title dark text-center">
              <v-icon class="dark">mdi-account</v-icon>
              {{ user.displayName }}
            </p>
            <p class="title font-weight-bold text-center">
              <v-icon class="dark">mdi-email</v-icon>
              {{ user.email }}
            </p>
          </v-layout>

          <div v-if="this.permissions.admin" class="text-center">
            <v-chip class="ma-2" color="indigo" text-color="white">
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>Administrador
            </v-chip>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn large color="primary" dark class="mx-auto mb-2" to="/change-password">
            <v-icon dark left>mdi-account-key</v-icon>Change Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import NavBarDashboard from "@/components/NavBarDashboard";

export default {
  name: "Profile",
  components: {
    NavBarDashboard
  },
  mounted() {
    if (localStorage.getItem("OpenAuth-user")) {
      this.user = JSON.parse(localStorage.getItem("OpenAuth-user") || "{}");
      this.permissions.admin = true;
      this.loggedIn = true;
    }
  },
  data() {
    return {
      overlay: false,
      loading: false,
      user: null,
      permissions: {
        admin: false,
        user: false
      }
    };
  },
  methods: {
    async uploadPicture() {
      this.loading = true;
      setInterval(() => {
        this.loading = false;
      }, 4000);
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>