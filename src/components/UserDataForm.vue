<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="form">
      <q-select
        v-model="selectedCountry"
        style="width: 250px"
        label="Your country"
        filled
        :options="countriesOptions"
        :rules="[(value) => notEmpty(value)]"
      />
      <q-select
        v-model="selectedGender"
        style="margin-bottom: 35px"
        filled
        :options="genderOptions"
        label="Your gender"
      />
      <q-input
        v-model="age"
        type="number"
        label="Your age"
        filled
        :rules="[(value) => positiveNumber(value)]"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';
import {
  fetchCountries,
  fetchLifeExpectancy,
} from 'src/services/statisticsService';
import { notEmpty, positiveNumber } from 'src/composables/inputRules';
import { useUserStore } from 'src/stores/userStore';

const router = useRouter();
const form = ref(null);
const selectedCountry = ref('');
const countriesOptions = ref([]);
const selectedGender = ref<'Female' | 'Male' | 'Other'>('Other');
const genderOptions = ['Female', 'Male', 'Other'];
const age = ref(0);

fetchCountries().then((response) => {
  countriesOptions.value = response;
});

async function onSubmit() {
  if (form.value !== null) {
    let lifeExpectancy;
    const response = await fetchLifeExpectancy(
      selectedCountry.value,
      selectedGender.value
    );
    lifeExpectancy = response;
    age.value = Number(age.value);

    console.log('lifeExpectancy', lifeExpectancy);
    const userStore = useUserStore();
    userStore.setUserData(lifeExpectancy, age.value);
    router.push('/signin');
  }
}

function onReset() {
  selectedCountry.value = '';
  selectedGender.value = 'Other';
  age.value = 0;
}
</script>
src/stores/userStore
