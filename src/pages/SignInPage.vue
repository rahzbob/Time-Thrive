<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-form @submit.prevent="onSubmit" ref="form">
      <q-card class="q-pa-md shadow-2" bordered>
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
          <div class="text-grey-8">Sign in below to access your account.</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="email"
            dense
            outlined
            label="Email Address"
            lazy-rules
            :rules="[(value) => validEmail(value), (value) => notEmpty(value)]"
          ></q-input>
          <q-input
            type="password"
            v-model="password"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[
              (value) => notEmpty(value),
              (value) => matchPassword(value),
            ]"
            label="Password"
          ></q-input>
        </q-card-section>
        <q-card-section>
          <q-btn
            type="submit"
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
            Don't have an account yet ?
            <router-link
              to="/signup"
              class="text-dark text-weight-bold"
              style="text-decoration: none"
            >
              Sign up
            </router-link>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md" v-if="!isValidAuthentication">
          <span class="text-red-7">{{ errorMessage }}</span>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onSubmit } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import {
  validEmail,
  notEmpty,
  matchPassword,
} from 'src/composables/inputRules';
import { QForm } from 'quasar';

const router = useRouter();
const form = ref(null);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
let isValidAuthentication = ref(true);

async function onSubmit() {
  const formValidated: QForm = await form.value.validate();

  if (formValidated) {
    try {
      await api.post('/signin', {
        email: email.value,
        mot_de_passe: password.value,
      });
      router.push('/results');
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}

async function matchPassword(password) {
  try {
    const response = await api.post('/check-password', {
      email: email.value,
      password,
    });
    return response.data.match || 'Please enter a valid password.';
  } catch (error) {
    console.error('Error validating password:', error);
    return false;
  }
}
// function showErrorNotification(message) {
//   window.alert(message);
// }
</script>
