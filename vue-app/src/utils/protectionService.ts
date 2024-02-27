import { useKeycloakStore } from "@/stores/keycloakStore";
import { serviceFactory } from "./factory";
import { useUserStore } from "@/stores/userStore";

export async function fetchProtectedData(): Promise<string> {
    // const keycloak = useKeycloakStore().keycloak;
    const userStore = useUserStore()
    // const keycloak = serviceFactory(userStore)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userStore.token}`);
    var requestOptions = {
        headers: myHeaders,
    };

    try {
        const response = await fetch('/api/protected', requestOptions);
        if (response.ok) {
            console.info("Protected data loaded successfully");
            const text = await response.text();
            return text;
        } else {
            console.error("Protected data not loaded");
            return "Protected data not loaded";
        }
    } catch (err) {
        console.error("Protected data not loaded");
        return "Protected data not loaded";
    }
}