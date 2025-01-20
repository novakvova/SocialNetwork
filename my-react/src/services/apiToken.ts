import { jwtDecode } from "jwt-decode";
import { TokenPayload, TokenPayloadItems } from "../models/accounts";

const accessTokenKey = "access-token";

export const apiToken = {
    save(accessToken: string) {
        localStorage.setItem(accessTokenKey, accessToken);
    },
    get(): string | null {
        return localStorage.getItem(accessTokenKey);
    },
    clear(): void {
        localStorage.removeItem(accessTokenKey);
    },
    getPayload(): TokenPayload | null {
        const token = this.get();
        if (token === null) return null;

        try {
            const payload = jwtDecode<TokenPayloadItems>(token);
            return {
                id: payload["user_id"],
                username: payload["username"],
                email: payload["email"],
                role: payload["role"],
                birthDate: payload["birth_date"],
                phoneNumber: payload["phone_number"]

            };
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }
};
