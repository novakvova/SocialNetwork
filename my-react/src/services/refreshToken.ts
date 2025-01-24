import { APP_ENV } from "../env";
import { apiToken } from "./apiToken";

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = apiToken.getRefreshToken();

    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }
  
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      console.log("Refresh token being sent:", refreshToken);

      const response = await fetch(`${APP_ENV.REMOTE_BASE_URL}token/refresh/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!response) {
        throw new Error("Failed to refresh token");
      }
  
      const data = await response.json();
      apiToken.saveTokens(data.access, data.refresh);
      return data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      apiToken.clearTokens(); 
      return null;
    }
  };
  