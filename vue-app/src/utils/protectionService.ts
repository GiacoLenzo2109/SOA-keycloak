import { useUserStore } from "@/stores/userStore";

export async function fetchProtectedData(): Promise<string> {
    const userStore = useUserStore()
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