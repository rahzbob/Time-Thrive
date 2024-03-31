<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-form @submit="onSubmit">
      <q-card class="q-pa-md shadow-2" bordered>
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
          <div class="text-grey-8">Sign in below to access your account.</div>
        </q-card-section>
        <q-card-section>
          <q-input
            dense
            outlined
            v-model="email"
            label="Email Address"
            :rules="[(value) => validEmail(value), (value) => notEmpty(value)]"
          ></q-input>
          <q-input
            dense
            outlined
            class="q-mt-md"
            v-model="password"
            :rules="[(value) => notEmpty(value)]"
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
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { validEmail, notEmpty } from 'src/composables/inputRules';

const router = useRouter();
const email = ref('');
const password = ref('');

async function onSubmit() {
  try {
    await api.post('/signin', {
      email: email.value,
      mot_de_passe: password.value,
    });

    router.push('/results');
  } catch (error) {
    console.log('Erreur : ', error);
  }
}
</script>
