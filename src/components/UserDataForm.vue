<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Form</div>
            <div class="text-grey-8">
              Fill the form below to see your years left.
            </div>
          </q-card-section>
          <q-card-section>
            <q-select
              v-model="selectedCountry"
              style="width: 250px"
              label="Your country"
              filled
              :options="countriesOptions"
              :rules="[(value) => notEmpty(value)]"
              class="full-width"
            ></q-select>
            <q-select
              v-model="selectedGender"
              style="margin-bottom: 35px"
              filled
              :options="genderOptions"
              label="Your gender"
            ></q-select>
            <q-input
              v-model="age"
              type="number"
              label="Your age"
              filled
              :rules="[(value) => positiveNumber(value)]"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              @click="onSubmit"
              style="border-radius: 8px"
              color="primary"
              rounded
              size="md"
              label="See result"
              no-caps
            ></q-btn>

            <q-btn
              @click="onReset"
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  fetchCountries,
  fetchLifeExpectancy,
} from 'src/services/statisticsService';
import { notEmpty, positiveNumber } from 'src/composables/inputRules';
import { useUserStore } from 'src/stores/userStore';

const router = useRouter();
const selectedCountry = ref('');
const countriesOptions = ref([]);
const selectedGender = ref<'Female' | 'Male' | 'Other'>('Other');
const genderOptions = ['Female', 'Male', 'Other'];
const age = ref(0);

fetchCountries().then((response) => {
  countriesOptions.value = response;
});

async function onSubmit() {
  if (
    selectedCountry.value !== '' &&
    ['Female', 'Male', 'Other'].includes(selectedGender.value) &&
    age.value > 0
  ) {
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
