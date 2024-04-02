<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-form @submit.prevent="onSubmit" ref="form">
      <q-card class="q-pa-md shadow-2 my_card" bordered>
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">Sign Up</div>
          <div class="text-grey-8">
            Fill the form below to create an account.
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="prenom"
            dense
            outlined
            label="First name"
            lazy-rules
            :rules="[(value) => notEmpty(value)]"
          ></q-input>
          <q-input
            v-model="nom"
            dense
            outlined
            label="Last name"
            class="q-mt-md"
            lazy-rules
            :rules="[(value) => notEmpty(value)]"
          ></q-input>
          <q-input
            v-model="email"
            dense
            outlined
            class="q-mt-md"
            label="Email address"
            lazy-rules
            :rules="[(value) => notEmpty(value), (value) => validEmail(value)]"
          ></q-input>
          <q-input
            v-model="password"
            dense
            outlined
            class="q-mt-md"
            type="password"
            label="Password"
            lazy-rules
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
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import {
  notEmpty,
  validEmail,
  validPassword,
} from 'src/composables/inputRules';

const router = useRouter();
const form = ref(null);
const prenom = ref('');
const nom = ref('');
const email = ref('');
const password = ref('');

async function onSubmit() {
  const formValidated = await form.value.validate();

  if (formValidated) {
    try {
      await api.post(
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
      router.push('/results');
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
}
</script>
