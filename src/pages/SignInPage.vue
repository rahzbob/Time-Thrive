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
          />
          <q-input
            v-model="password"
            type="password"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(value) => notEmpty(value)]"
            label="Password"
          />
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
          />
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
          <span class="text-red-7"
            >Wrong email or password. Please try again.</span
          >
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QForm } from 'quasar';
import { api } from 'src/boot/axios';
import { validEmail, notEmpty } from 'src/composables/inputRules';
import { useUserStore } from 'src/stores/userStore';

const router = useRouter();
const form = ref<QForm | null>(null);
const email = ref('');
const password = ref('');
const isValidAuthentication = ref(true);

async function onSubmit() {
  if (form.value === null) {
    throw new Error('Form is null');
  }

  const formValidated = await form.value.validate();

  if (formValidated) {
    try {
      const response = await api.post('/signin', {
        email: email.value,
        mot_de_passe: password.value,
      });

      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token);

        const userStore = useUserStore();
        userStore.setAuthenticated(true);

        router.push('/results');
      }
    } catch (error: any) {
      isValidAuthentication.value = false;
    }
  }
}
</script>
