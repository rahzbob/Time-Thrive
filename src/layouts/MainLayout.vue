<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <router-link to="/" style="text-decoration: none" class="text-white">
          <q-toolbar-title> Time Thrive </q-toolbar-title>
        </router-link>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
