import { Middleware } from "@reduxjs/toolkit";
import { apiToken } from "../../services/apiToken";
import { refreshAccessToken } from "../../services/refreshToken";
import { clear } from "../account/accountSlice";
import { jwtDecode } from "jwt-decode";
import { TokenPayloadItems } from "../../models/accounts";

export const authMiddleware: Middleware = (store) => (next) => async (action) => {
  const accessToken = apiToken.getAccessToken();
  
  if (accessToken) {
    const isExpired = checkTokenExpiration(accessToken);
    if (isExpired) {
      const newAccessToken = await refreshAccessToken();
      
      if (!newAccessToken) {
        store.dispatch(clear()); 
      }
    }
  }

  return next(action);
};

const checkTokenExpiration = (token: string): boolean => {
  try {
    const payload = jwtDecode<TokenPayloadItems>(token);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true; // Вважати токен протермінованим у разі помилки
  }
};
