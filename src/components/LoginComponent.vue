<template>
  <!-- <h1>Login page</h1> -->

  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="email"
              label="Email Address"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="mot_de_passe"
              type="password"
              label="Password"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              @click="login"
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <a
                href="#/signup"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'src/boot/axios';

const LoginComponent = {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      mot_de_passe: '',
    };
  },

  methods: {
    async login() {
      // console.log(this.email, this.password);

      try {
        const response = await axios.post('/api/login', {
          email: this.email,
          mot_de_passe: this.mot_de_passe,
        });
        console.log(response.data);
      } catch (error) {
        console.log('Erreur : ', error);
      }
    },
  },
};
export default LoginComponent;
</script>
