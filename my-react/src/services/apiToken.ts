import { jwtDecode } from "jwt-decode";
import { TokenPayload, TokenPayloadItems } from "../models/accounts";

const accessTokenKey = "access-token";
const refreshTokenKey = "refresh-token";

export const apiToken = {
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
    // console.log("Access token save:", accessToken);
    // console.log("Refresh token save:", refreshToken);
  },
  getAccessToken(): string | null {
    return localStorage.getItem(accessTokenKey);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(refreshTokenKey);
  },
  clearTokens(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },
  getPayload(): TokenPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;

        try {
            const payload = jwtDecode<TokenPayloadItems>(token);
              return {
                id: payload["user_id"],
                email: payload["email"],
                role: payload["role"],
                exp: payload["exp"],
              };
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }
};
