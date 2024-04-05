<template>
  <q-dialog>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="logout" />
        <div class="text-h6">Sign out</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">You have successfully signed out.</span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
