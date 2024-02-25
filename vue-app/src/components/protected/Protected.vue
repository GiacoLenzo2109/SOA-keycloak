<script setup lang="ts">

import { useKeycloakStore } from '@/stores/keycloakStore';
import { onMounted, ref } from 'vue';
import { fetchProtectedData } from '@/utils/protectionService';


const protectedData = ref("")

async function fetchData() {

    const keycloak = useKeycloakStore().keycloak

    if(keycloak?.authenticated != null && !keycloak?.authenticated){
        keycloak.login().then(async _ => {
            protectedData.value = await fetchProtectedData();
        })
    }
    else {
        protectedData.value = await fetchProtectedData();
    }
}

// function fetchProtectedData() {
//     const keycloak = useKeycloakStore().keycloak
//     var myHeaders = new Headers();
//     myHeaders.append('Authorization', `Bearer ${keycloak?.token}`);
//     var requestOptions = {
//         headers: myHeaders,
//     };

//     fetch('/api/protected', requestOptions)
//         .then(response => response.text())
//         .then(text => {
//             protectedData.value = text
//             console.info("Protected data loaded successfully")
//         }
//     ).catch(err => console.error(protectedData.value = "Protected data not loaded"))
// }

onMounted(() => {
    console.log("Mounted")
    fetchData()
})
</script>

<template>
    <h3>Data: {{ protectedData }}</h3>
</template>