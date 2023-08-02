<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section> Count: {{ counter }} </q-card-section>
      <q-card-section> Double Count: {{ doubleCount }} </q-card-section>
      <q-card-section>
        <q-btn label="increment" @click="increment"></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from 'src/stores/example-store';
import { computed } from 'vue';

const counterStore = useCounterStore();
const { counter } = storeToRefs(counterStore);
const doubleCount = computed(() => counterStore.doubleCount);
const { increment } = counterStore;
</script>
