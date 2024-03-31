<template>
  <div class="q-pa-xl flex justify-center full-width">
    <div class="column items-center">
      <div class="text-h5">You have</div>
      <div class="text-h1 text-secondary">{{ yearsLeft }}</div>
      <div class="text-h5">years left to live in average.</div>
    </div>
  </div>
  <div class="q-px-xl q-py-sm text-h2 justify-left full-width">
    Life calendar
  </div>
  <div class="q-px-xl q-pb-sm row full-width">
    <div class="month bg-accent" />
    <label class="q-pl-xs q-pr-xl">Months you lived</label>
    <div class="month bg-secondary" />
    <label class="q-pl-xs">Months you have left</label>
  </div>
  <div class="q-px-xl row full-width">
    <div
      v-for="(index, month) in months"
      :key="month"
      :class="month > ageInMonths ? 'month bg-secondary' : 'month bg-accent'"
      class="month"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';

const userStore = useUserStore();
const lifeExpectancy = userStore.lifeExpectancy;
const age = userStore.age;
const lifeExpectancyInMonths = Math.round(lifeExpectancy * 12);
const ageInMonths = Math.round(age * 12);
const months = ref(Array(lifeExpectancyInMonths).fill({}));
const yearsLeft = Math.round(lifeExpectancy - age);
</script>

<style scoped>
.month {
  width: 16px;
  height: 16px;
  margin: 2px;
  border-radius: 2px;
}
</style>
