<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="100%">
      <template v-slot:activator="{ on }">
        <v-btn x-large class="primary mt-4" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
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

                          <h3 class="text-center mt-3">
                            <v-icon small color="black" dark left>mdi-key</v-icon>Forgot your password?
                          </h3>

                          <div class="text-center mt-3">
                            <v-btn type="submit" x-large dark color="blue" rounded>SIGN IN</v-btn>
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
                        <v-btn large dark @click="step--" outlined rounded>SIGN IN</v-btn>
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
                            <v-btn type="submit" x-large dark color="blue" rounded>SIGN UP</v-btn>
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    step: 1,
    login_email: null,
    login_password: null,
    signup_name: null,
    signup_email: null,
    signup_password: null,
    showPasswordSignIn: false,
    showPasswordSignup: false
  }),
  methods: {
    async signIn() {
      if (this.login_email && this.login_password) {
        console.log("Login_data: " + this.login_email, this.login_password);
      } else {
        console.log("No data");
      }
    },
    async signUp() {
      if (this.signup_name && this.signup_email && this.signup_password) {
        console.log(
          "Signup_data: " + this.signup_name,
          this.signup_email,
          this.signup_password
        );
      } else {
        console.log("No data");
      }
    }
  }
};
</script>