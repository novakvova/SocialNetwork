import { apiToken } from "./apiToken";

export const apiAccount = {
    login(accessToken: string, refreshToken: string) {
        apiToken.saveTokens(accessToken, refreshToken);
    },
    logout() {
        apiToken.clearTokens();
    },
    isAuthenticated(): boolean {
        return apiToken.getAccessToken() !== null;
    }
}