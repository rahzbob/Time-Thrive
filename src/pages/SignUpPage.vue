<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign Up</div>
            <div class="text-grey-8">
              Fill the form below to create an account.
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="prenom"
              label="First name"
              :rules="[(value) => notEmpty(value)]"
            ></q-input>
            <q-input
              dense
              outlined
              v-model="nom"
              label="Last name"
              class="q-mt-md"
              :rules="[(value) => notEmpty(value)]"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="email"
              label="Email address"
              :rules="[
                (value) => notEmpty(value),
                (value) => validEmail(value),
              ]"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
              :rules="[
                (value) => notEmpty(value),
                (value) => validPassword(value),
              ]"
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
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import {
  notEmpty,
  validEmail,
  validPassword,
} from 'src/composables/inputRules';

const router = useRouter();
const prenom = ref('');
const nom = ref('');
const email = ref('');
const password = ref('');

async function onSubmit() {
  try {
    const response = await api.post(
      '/signup',
      {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        mot_de_passe: password.value,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    console.log('User added', response.data);
    router.push('/results');
  } catch (error) {
    console.log('Erreur:', error);
  }
}
</script>
