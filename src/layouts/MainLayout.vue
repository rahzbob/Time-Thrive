<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row justify-between">
        <router-link to="/" style="text-decoration: none" class="text-white">
          <q-toolbar-title>Time Thrive</q-toolbar-title>
        </router-link>
        <q-btn-dropdown unelevated rounded color="secondary" icon="person">
          <q-list v-if="isAuthenticated">
            <q-item @click="signOut" clickable v-ripple>
              <q-item-section>Sign out</q-item-section>
            </q-item>
          </q-list>
          <q-list v-else>
            <q-item @click="router.push('/signin')" clickable v-ripple>
              <q-item-section>Sign in</q-item-section>
            </q-item>
            <q-separator />
            <q-item @click="router.push('/signup')" clickable v-ripple>
              <q-item-section>Sign up</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <sign-out-dialog v-model="signOutAlert" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/userStore';
import SignOutDialog from 'src/components/SignOutDialog.vue';

const router = useRouter();
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.authenticated);
const signOutAlert = ref(false);

async function signOut() {
  signOutAlert.value = true;
  localStorage.removeItem('token');
  userStore.setAuthenticated(false);
}
</script>
