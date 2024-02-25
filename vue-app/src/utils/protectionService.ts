import { useKeycloakStore } from "@/stores/keycloakStore";

export async function fetchProtectedData(): Promise<string> {
    const keycloak = useKeycloakStore().keycloak;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${keycloak?.token}`);
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