<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchProtectedData } from '@/utils/protectionService';
import { useUserStore } from '@/stores/userStore';
import { serviceFactory } from '@/utils/factory';


const protectedData = ref("User is not an Admin")

async function fetchData() {

    const userStore = useUserStore()
    const keycloak = serviceFactory(userStore)

    if(!userStore.authenticated){
        keycloak.login().then(async _ => {
            let data = await fetchProtectedData();
            const userData = JSON.parse(data)
            userStore.roles.forEach((role: string) => {
                if(role === 'admin'){
                    protectedData.value = JSON.stringify(userData)
                }
            })
        })
    }
    else {
        let data = await fetchProtectedData();
        const userData = JSON.parse(data)
        userStore.roles.forEach((role: string) => {
            if(role === 'admin'){
                protectedData.value = JSON.stringify(userData)
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