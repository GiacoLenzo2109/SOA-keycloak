<script setup lang="ts">

import { useKeycloakStore } from '@/stores/keycloakStore';
import { onMounted, ref } from 'vue';
import { fetchProtectedData } from '@/utils/protectionService';


const protectedData = ref("User is not an Admin")

async function fetchData() {

    const keycloak = useKeycloakStore().keycloak

    if(keycloak?.authenticated != null && !keycloak?.authenticated){
        keycloak.login().then(async _ => {
            let data = await fetchProtectedData();
            const userData = JSON.parse(data)

            userData['request_token']['realm_access']['roles'].forEach((role: string) => {
                if(role === 'admin'){
                    protectedData.value = data.toString()
                }
            })
        })
    }
    else {
        let data = await fetchProtectedData();
        const userData = JSON.parse(data)
        userData['request_token']['realm_access']['roles'].forEach((role: string) => {
            if(role === 'admin'){
                protectedData.value = data.toString()
            }
        })
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <h1>Admin</h1>
    <h3>Data: {{ protectedData }}</h3>
</template>