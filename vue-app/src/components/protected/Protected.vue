<script setup lang="ts">

import { useKeycloakStore } from '@/stores/keycloakStore';
import { onMounted, ref } from 'vue';
import { fetchProtectedData } from '@/utils/protectionService';
import { serviceFactory } from '@/utils/factory';
import { useUserStore } from '@/stores/userStore';


const protectedData = ref("")
const userStore = useUserStore()
const keycloak = serviceFactory(userStore)

async function fetchData() {
    protectedData.value = await fetchProtectedData();
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <h3 v-if="userStore.authenticated">Data: {{ protectedData }}</h3>
    <h3 v-else>Login to load protected data!</h3>
</template>