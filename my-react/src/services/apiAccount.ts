import { apiToken } from "./apiToken";

export const apiAccount = {
    login(accessToken: string) {
        apiToken.save(accessToken);
    },
    logout() {
        apiToken.clear();
    },
    isAuthenticated(): boolean {
        return apiToken.get() !== null;
    }
}