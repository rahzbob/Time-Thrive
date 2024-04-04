<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="form">
      <q-card class="q-pa-md shadow-2 my_card" bordered>
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">Form</div>
          <div class="text-grey-8">
            Please fill the form below to see your life expectancy.
          </div>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="selectedCountry"
            class="field"
            label="Your country"
            filled
            :options="countriesOptions"
            :rules="[(value) => notEmpty(value)]"
          />
          <q-select
            v-model="selectedGender"
            style="margin-bottom: 30px"
            class="field"
            label="Your gender"
            filled
            :options="genderOptions"
          />
          <q-input
            v-model="age"
            class="field"
            type="number"
            label="Your age"
            filled
            :rules="[(value) => positiveNumber(value)]"
          />
          <q-input
            v-model="height"
            class="field"
            type="number"
            label="Your height (cm)"
            filled
            :rules="[(value) => positiveNumber(value)]"
          />
          <q-input
            v-model="weight"
            class="field"
            type="number"
            label="Your weight (kg)"
            filled
            :rules="[(value) => positiveNumber(value)]"
          />
          <q-checkbox v-model="smoker" label="Are you a smoker ?" filled />
        </q-card-section>
        <q-card-section>
          <q-btn
            @click="onSubmit"
            style="border-radius: 8px"
            label="See result"
            color="primary"
            size="md"
            rounded
            no-caps
          />
          <q-btn
            @click="onReset"
            label="Reset"
            type="reset"
            color="primary"
            class="q-ml-sm"
            flat
          />
        </q-card-section>
      </q-card>
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
  calculateObesityLifeExpectancyLoss,
} from 'src/services/statisticsService';
import { notEmpty, positiveNumber } from 'src/composables/inputRules';
import { useUserStore } from 'src/stores/userStore';

const router = useRouter();
const form = ref<QForm | null>(null);
const selectedCountry = ref('');
const countriesOptions = ref([]);
const selectedGender = ref<'Female' | 'Male' | 'Other'>('Other');
const genderOptions = ['Female', 'Male', 'Other'];
const age = ref(0);
const smoker = ref(false);
const height = ref(0);
const weight = ref(0);

fetchCountries().then((response) => {
  countriesOptions.value = response;
});

async function onSubmit() {
  if (form.value === null) {
    throw new Error('Form is null');
  }

  const formValidated = await form.value.validate();

  if (formValidated) {
    age.value = Number(age.value);
    let lifeExpectancy = 0;
    const response = await fetchLifeExpectancy(
      selectedCountry.value,
      selectedGender.value
    );

    lifeExpectancy = response;

    const obesityLoss = calculateObesityLifeExpectancyLoss(
      height.value,
      weight.value
    );

    lifeExpectancy -= obesityLoss;

    if (smoker.value) lifeExpectancy -= 6.8;

    const userStore = useUserStore();
    userStore.setUserData(lifeExpectancy, age.value);
    const isAuthenticated = userStore.authenticated;

    if (isAuthenticated) {
      router.push('/results');
    } else {
      router.push('/signin');
    }
  }
}

function onReset() {
  selectedCountry.value = '';
  selectedGender.value = 'Other';
  age.value = 0;
  height.value = 0;
  weight.value = 0;
  smoker.value = false;
}
</script>

<style>
.field {
  margin-bottom: 10px;
}
</style>
