<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="form">
      <q-select
        v-model="selectedCountry"
        style="width: 250px"
        label="Your country"
        filled
        :options="countriesOptions"
        :rules="[
          (val) => (val && val.length > 0) || 'Please select your country',
        ]"
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
        :rules="[(val) => (val !== 0 && val > 0) || 'Please enter your age']"
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
import { fetchCountries, fetchLifeExpectancy } from 'src/services/statistics';

const form = ref(null);
const selectedCountry = ref('');
const countriesOptions = ref([]);
const selectedGender = ref<'Female' | 'Male' | 'Other'>('Other');
const genderOptions = ['Female', 'Male', 'Other'];
const age = ref(0);

fetchCountries().then((response) => {
  countriesOptions.value = response;
});

function onSubmit() {
  if (form.value !== null) {
    let lifeExpectancy;
    fetchLifeExpectancy(selectedCountry.value, selectedGender.value).then(
      (response) => {
        lifeExpectancy = (response - Number(age.value)).toFixed(1);
      }
    );
  }
}

// to reset validations
function onReset() {
  selectedCountry.value = '';
  selectedGender.value = 'Other';
  age.value = 0;
}
</script>
