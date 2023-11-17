<script setup lang="ts">
import Item from '../Item.vue';
import DocumentationIcon from '../icons/IconDocumentation.vue';
import ToolingIcon from '../icons/IconTooling.vue';
import CommunityIcon from '../icons/IconCommunity.vue';
import LoginIcon from '../icons/IconLogin.vue';
import Button from '../../components/Button.vue';
import { useKeycloakStore } from '@/stores/keycloakStore';
import { ref, computed, onMounted, onUpdated } from 'vue';

let keycloak = useKeycloakStore().keycloak;

onMounted(() => {
  updateIsLogged();
});

onUpdated(() => {
  updateIsLogged();
});

const isLogged = ref(keycloak?.authenticated);

const buttonText = computed(() => (isLogged.value ? 'Logout' : 'Login'));

function updateIsLogged() {
    setInterval(() => {
      isLogged.value = keycloak!.authenticated ? true : false;
      console.log("IsLogged: " + isLogged.value)  
      }
    )
}

function login() {
  keycloak?.login().then(() => {
    console.log("Login successful!");
    updateIsLogged();
  });
}

function logout() {
  keycloak?.logout().then(() => {
    console.log("Logout successful!");
    updateIsLogged();
  });
}

function signin() {
  isLogged.value ? logout() : login()
}
</script>


<template>
  <item>
    <template #icon>
      <LoginIcon/>
    </template>
    <Button :buttonText="buttonText" @click="signin()"/>
  </item>

  <Item>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    Vue's front-end for the SOA project.
  </Item>

  <Item>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    We interact with keycloak using keycloak-js package. The keycloak's client authentication is set to public.
    <br/>
    Keycloak runs on <a href="http://localhost:8080/" target="_blank">http://localhost:8080/</a> inside a Docker's container.
  </Item>

  <Item>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Authors</template>
    This project was made by:
    <br/>
    <br/>
    <b>- Camilla Gussoni 14086A</b>
    <br/>
    <b>- Giacomo Lenzini 14098A</b>
  </Item>
</template>





