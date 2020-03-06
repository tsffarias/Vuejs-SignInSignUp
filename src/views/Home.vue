<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2">Sign in to OpenAuth</h1>
                        <div class="text-center mt-4">
                          <v-btn
                            @click="signInWithFacebook()"
                            class="mx-2"
                            fab
                            color="black"
                            :loading="FacebookBtnloading"
                            outlined
                          >
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn
                            @click="signInWithGoogle()"
                            class="mx-2"
                            fab
                            color="black"
                            :loading="GoogleBtnloading"
                            outlined
                          >
                            <v-icon>fab fa-google</v-icon>
                          </v-btn>
                          <v-btn
                            @click="signInWithTwitter()"
                            class="mx-2"
                            fab
                            color="black"
                            :loading="TwitterBtnloading"
                            outlined
                          >
                            <v-icon>fab fa-twitter</v-icon>
                          </v-btn>
                          <v-btn
                            @click="signInWithGithub()"
                            class="mx-2"
                            fab
                            color="black"
                            :loading="GithubBtnloading"
                            outlined
                          >
                            <v-icon>fab fa-github</v-icon>
                          </v-btn>
                        </div>
                        <h4
                          class="text-center mt-4"
                        >Log in to your account using your favorite social media</h4>

                        <form @submit.prevent="signIn">
                          <v-text-field
                            label="Email"
                            name="loginEmail"
                            v-model="login_email"
                            prepend-icon="email"
                            type="email"
                            color="blue"
                            clearable
                            required
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            name="loginPassword"
                            v-model="login_password"
                            prepend-icon="lock"
                            :append-icon="showPasswordSignIn ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="showPasswordSignIn ? 'text' : 'password'"
                            color="blue"
                            clearable
                            required
                            @click:append="showPasswordSignIn = !showPasswordSignIn"
                          ></v-text-field>

                          <h3 class="text-center mt-3 cursor" @click="forgotPassword">
                            <v-icon small color="black" dark left>mdi-key</v-icon>Forgot your password?
                          </h3>

                          <div class="text-center mt-3">
                            <v-btn
                              type="submit"
                              x-large
                              dark
                              color="blue"
                              :loading="loading"
                              rounded
                            >SIGN IN</v-btn>
                          </div>
                        </form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="blue">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friends!</h1>
                        <h5
                          class="text-center mt-2"
                        >Enter your personal details and start your journey with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn type="submit" large dark @click="step++" outlined rounded>SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center mt-2"
                        >To Keep connected with us please login with your personal info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn id="signInButton" large dark @click="step--" outlined rounded>SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2">Create Account</h1>

                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-twitter</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-github</v-icon>
                          </v-btn>
                        </div>

                        <h4 class="text-center mt-4">Sign up using your favorite social media</h4>

                        <form @submit.prevent="signUp">
                          <v-text-field
                            label="Name"
                            name="signupName"
                            v-model="signup_name"
                            prepend-icon="person"
                            type="text"
                            color="blue"
                            clearable
                            required
                          ></v-text-field>
                          <v-text-field
                            label="Email"
                            name="signupEmail"
                            v-model="signup_email"
                            prepend-icon="email"
                            type="email"
                            color="blue"
                            clearable
                            required
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            name="signupPassword"
                            v-model="signup_password"
                            prepend-icon="lock"
                            :append-icon="showPasswordSignup ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="showPasswordSignup ? 'text' : 'password'"
                            color="blue"
                            clearable
                            required
                            @click:append="showPasswordSignup = !showPasswordSignup"
                          ></v-text-field>

                          <div class="text-center mt-5">
                            <v-btn
                              type="submit"
                              x-large
                              dark
                              color="blue"
                              :loading="loading"
                              rounded
                            >SIGN UP</v-btn>
                          </div>
                        </form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="snackbar" :color="snackbarType" :timeout="timeout">
        {{ snackbarText }}
        <v-btn text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from "@/main";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "SignInSignUp",
  data: () => ({
    step: 1,
    loading: false,
    snackbar: false,
    snackbarType: "success",
    timeout: 4000,
    snackbarText: "",
    FacebookBtnloading: false,
    GoogleBtnloading: false,
    TwitterBtnloading: false,
    GithubBtnloading: false,
    login_email: null,
    login_password: null,
    signup_name: null,
    signup_email: null,
    signup_password: null,
    showPasswordSignIn: false,
    showPasswordSignup: false
  }),
  props: {
    source: String
  },
  methods: {
    async signIn() {
      if (this.login_email && this.login_password) {
        // Button loader
        this.loading = true;

        await auth
          .signInWithEmailAndPassword(this.login_email, this.login_password)
          .then(result => {
            // Setting user data to localStorage
            localStorage.setItem("OpenAuth-user", JSON.stringify(result.user));

            // Checking if email address is verified
            if (result.user.emailVerified === false) {
              // Sending the email Verification to the user
              let user = firebase.auth().currentUser;
              user
                .sendEmailVerification()
                .then(function() {
                  auth.signOut();
                  localStorage.setItem(`emailVerificationSent`, `true`);
                  localStorage.removeItem("isAuthenticatedWithEmail");
                  localStorage.removeItem("OpenAuth-user");
                })
                .catch(function(error) {
                  this.$fire({
                    title: "Error",
                    text: error.message,
                    type: "error",
                    timer: 8000
                  }).then(() => {
                    this.loading = false;
                  });
                });

              // Show info message and redirect the user to sign in
              this.$fire({
                title: "Please verify your email address",
                text:
                  "We have sent an email with an activation link to your email address. In order to complete the sign-up process, please click the activation link.",
                type: "info",
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!'
              }).then(() => {
                this.loading = false;
              });
            } else {
              setTimeout(() => {
                this.loading = false;
                localStorage.setItem("isAuthenticatedWithEmail", "true");
                // Redirecting user to Dashboard page
                this.$router.push({ name: "Dashboard" });
              }, 1500);
            }
          })
          .catch(error => {
            this.snackbar = true;
            this.snackbarType = "error";
            this.snackbarText = error.message;
            this.loading = false;
          });
      }
    },
    async signUp() {
      if (this.signup_name && this.signup_email && this.signup_password) {
        // button loader
        this.loading = true;

        await auth
          .createUserWithEmailAndPassword(
            this.signup_email,
            this.signup_password
          )
          .then(() => {
            // Sending the email Verification to the user
            let user = firebase.auth().currentUser;
            user
              .sendEmailVerification()
              .then(function() {
                localStorage.setItem(`emailVerificationSent`, `true`);
              })
              .catch(function(error) {
                this.$fire({
                  title: "Error",
                  text: error.message,
                  type: "error",
                  timer: 8000
                }).then(() => {
                  this.loading = false;
                });
              });

            // Saving displayName
            firebase.auth().currentUser.updateProfile({
              displayName: this.signup_name
            });

            localStorage.setItem("isAuthenticatedWithEmail", "true");

            // Show success message and redirect the user to sign in
            this.$fire({
              title: "You have signed up successfully",
              text:
                "We have sent an email with an activation link to your email address.",
              type: "success",
              timer: 6000
            }).then(() => {
              this.loading = false;
              document.getElementById("signInButton").click();
            });
          })
          .catch(error => {
            this.$fire({
              title: "Error",
              text: error.message,
              type: "error",
              timer: 8000
            }).then(() => {
              this.loading = false;
            });
          });
      } else {
        console.log("No data");
      }
    },
    async forgotPassword() {
      this.$fire({
        title: "Forgot your password?",
        type: "info",
        showCloseButton: true,
        showCancelButton: true,
        input: "email",
        confirmButtonText: '<i class="fas fa-envelope"></i> Send Email!',
        inputPlaceholder: "Enter your email address"
      }).then(email => {
        // Sending reset email to user
        if (email) {
          auth
            .sendPasswordResetEmail(email.value)
            .then(() => {
              // showing success message
              this.$fire({
                type: "success",
                title: `Password Reset Email Sent`,
                html: `An email was sent to ${email.value}`,
                showConfirmButton: false,
                timer: 4000
              });
            })
            .catch(error => {
              this.$fire({
                type: "error",
                title: `Error`,
                text: error.message,
                timer: 4000
              });
            });
        }
      });
    },
    async signInWithFacebook() {
      // button loader
      this.FacebookBtnloading = true;

      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      auth
        .signInWithPopup(facebookProvider)
        .then(result => {
          localStorage.setItem("OpenAuth-user", JSON.stringify(result.user));

          localStorage.setItem("isAuthenticatedWithEmail", "true");
          setTimeout(() => {
            this.FacebookBtnloading = false;
            // redirecting user to Dashboard page
            this.$router.push({ name: "Dashboard" });
          }, 1000);
        })
        .catch(error => {
          this.$fire({
            title: "Error",
            text: error.message,
            type: "error",
            timer: 8000
          }).then(() => {
            this.FacebookBtnloading = false;
          });
        });
    },
    async signInWithGoogle() {
      // button loader
      this.GoogleBtnloading = true;

      const googleProvider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(googleProvider)
        .then(result => {
          localStorage.setItem("OpenAuth-user", JSON.stringify(result.user));

          localStorage.setItem("isAuthenticatedWithEmail", "true");
          setTimeout(() => {
            this.GoogleBtnloading = false;
            // redirecting user to Dashboard page
            this.$router.push({ name: "Dashboard" });
          }, 1000);
        })
        .catch(error => {
          this.$fire({
            title: "Error",
            text: error.message,
            type: "error",
            timer: 8000
          }).then(() => {
            this.GoogleBtnloading = false;
          });
        });
    },
    async signInWithTwitter() {
      // button loader
      this.TwitterBtnloading = true;

      const twitterProvider = new firebase.auth.TwitterAuthProvider();
      auth
        .signInWithPopup(twitterProvider)
        .then(result => {
          localStorage.setItem("OpenAuth-user", JSON.stringify(result.user));

          localStorage.setItem("isAuthenticatedWithEmail", "true");
          setTimeout(() => {
            this.TwitterBtnloading = false;
            // redirecting user to Dashboard page
            this.$router.push({ name: "Dashboard" });
          }, 1000);
        })
        .catch(error => {
          this.$fire({
            title: "Error",
            text: error.message,
            type: "error",
            timer: 8000
          }).then(() => {
            this.TwitterBtnloading = false;
          });
        });
    },
    async signInWithGithub() {
      // button loader
      this.GithubBtnloading = true;

      const githubProvider = new firebase.auth.GithubAuthProvider();
      auth
        .signInWithPopup(githubProvider)
        .then(result => {
          localStorage.setItem("OpenAuth-user", JSON.stringify(result.user));

          localStorage.setItem("isAuthenticatedWithEmail", "true");
          setTimeout(() => {
            this.GithubBtnloading = false;
            // redirecting user to Dashboard page
            this.$router.push({ name: "Dashboard" });
          }, 1000);
        })
        .catch(error => {
          this.$fire({
            title: "Error",
            text: error.message,
            type: "error",
            timer: 8000
          }).then(() => {
            this.GithubBtnloading = false;
          });
        });
    }
  }
};
</script>

<style>
.cursor {
  cursor: pointer;
}
</style>