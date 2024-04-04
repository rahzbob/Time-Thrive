import { defineStore } from 'pinia';

interface User {
  lifeExpectancy: number;
  age: number;
  authenticated: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): User => ({
    lifeExpectancy: 0,
    age: 0,
    authenticated: false,
  }),
  actions: {
    setUserData(lifeExpectancy: number, age: number) {
      this.lifeExpectancy = lifeExpectancy;
      this.age = age;
    },
    setAuthenticated(authenticated: boolean) {
      this.authenticated = authenticated;
    },
  },
});
