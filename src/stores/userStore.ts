import { defineStore } from 'pinia';

interface User {
  lifeExpectancy: number;
  age: number;
}

export const useUserStore = defineStore('user', {
  state: (): User => ({
    lifeExpectancy: 0,
    age: 0,
  }),
  actions: {
    setUserData(lifeExpectancy: number, age: number) {
      this.lifeExpectancy = lifeExpectancy;
      this.age = age;
    },
  },
});
