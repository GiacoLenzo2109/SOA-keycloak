<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useKeycloakStore } from './stores/keycloakStore';
  import { computed, onMounted, onUpdated, ref } from 'vue';
  import { fetchProtectedData } from './utils/protectionService';

  const keycloak = useKeycloakStore().keycloak
  const isAuthenticated = computed(() => keycloak?.authenticated);

  const isUserAdmin = ref(false);

  function isAdmin(): boolean {
    if(isAuthenticated.value){
      keycloak?.tokenParsed!.realm_access!.roles.forEach((role: string) => {
        if (role === "admin") {
          console.log("User is admin");
          isUserAdmin.value = true;
          return true;
        }
        else {
          console.error("User is not admin");
          isUserAdmin.value = false;
          return false;
        }
      });
    }
    console.error("User not logged in");
    isUserAdmin.value = false;
    return false;
  }

  onMounted(() => {
    isAdmin()
  });
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/protected">Protected</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>