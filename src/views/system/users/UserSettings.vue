<template>
  <v-content>
    <NavBarDashboard />

    <v-container>
      <div>
        <v-breadcrumbs :items="navigation">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
              <v-icon class="grey--text mr-2">{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>

      <template></template>

      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="6">
            <v-card class="mx-auto mt-1" max-width="500" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline font-weight-medium mb-1">Delete Account</v-list-item-title>
                  <v-list-item-subtitle>All your data and information will be removed from our database.</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar justify="space-around" size="80" color="grey">
                  <v-icon x-large color="white">mdi-account-remove</v-icon>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn @click="deleteAccount" large color="red" dark class="mx-auto mb-3" outlined>
                  <v-icon dark left>mdi-database-remove</v-icon>Delete my account
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-snackbar v-model="snackbar" :color="snackbarType">
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import NavBarDashboard from "@/components/NavBarDashboard";
import { auth } from "@/main";

export default {
  name: "UserSettings",
  components: {
    NavBarDashboard
  },
  data() {
    return {
      snackbar: false,
      snackbarType: "success",
      snackbarText: "",
      navigation: [
        {
          text: "Dashboard",
          disabled: false,
          icon: "mdi-view-dashboard",
          href: "dashboard"
        },
        {
          text: "Settings",
          disabled: true,
          icon: "mdi-settings",
          href: "user-settings"
        }
      ]
    };
  },
  methods: {
    async deleteAccount() {
      const userData = JSON.parse(localStorage.getItem("OpenAuth-user"));
      // Show alert message
      this.$fire({
        title: "Delete my account",
        html: `Are you sure you want to delete your account <strong>${userData.email}</strong>?`,
        type: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes, delete it!'
      }).then(result => {
        if (result.value) {
        
        // Removing account
        auth.currentUser.delete().then(() => {
          // Show success message and redirect the user to sign in
            this.$fire({
              title: "Account deleted successfully",
              text: "We're sad to see you go :(",
              type: "success",
              timer: 4000
            }).then(() => {
              auth.signOut();
              localStorage.removeItem("emailVerificationSent");
              localStorage.removeItem("isAuthenticatedWithEmail");
              localStorage.removeItem("OpenAuth-user");
              this.$router.push({ name: "Home" });
            });
        })
        .catch(error => {
            if (error.code === 'auth/requires-recent-login') {
                auth.signOut()
                    .then(() => {
                        this.$fire({
                          title: "Error",
                          text: error.message,
                          type: "error",
                          timer: 4000
                        })
                    })
            }
        })
        }
      });
    }
  }
};
</script>

<style>
</style>