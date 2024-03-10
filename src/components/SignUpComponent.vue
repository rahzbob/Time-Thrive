<template>
  <!-- <h1>Login page</h1> -->

  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign Up</div>
            <div class="text-grey-8">
              Rempli le formulaire en dessous pour t'inscrire
            </div>
          </q-card-section>

          <q-card-section>
            <q-input dense outlined v-model="prenom" label="Prenom"></q-input>
            <q-input
              dense
              outlined
              v-model="nom"
              label="Nom"
              class="q-mt-md"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="email"
              label="Email Address"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="mot_de_passe"
              type="password"
              label="mot_de_passe"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              @click="onSubmit"
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
              <!-- Don't have an account yet?
              <a
                href="#"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              > -->
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { ref } from 'vue';
// import axios from 'axios';
import { api } from 'src/boot/axios';

const SignUpComponent = {
  name: 'SignUpComponent',
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
      mot_de_passe: '',
    };
  },

  methods: {
    async onSubmit() {
      try {
        const response = await api.post(
          '/signup',
          {
            prenom: this.prenom,
            nom: this.nom,
            email: this.email,
            mot_de_passe: this.mot_de_passe,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        console.log('User added', response.data);
        return response;
      } catch (error) {
        console.log('Erreur:', error);
      }
    },
  },
};

export default SignUpComponent;
</script>
