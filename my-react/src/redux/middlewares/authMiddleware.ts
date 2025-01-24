import { Middleware } from "@reduxjs/toolkit";
import { apiToken } from "../../services/apiToken";
import { refreshAccessToken } from "../../services/refreshToken";
import { clear } from "../account/accountSlice";

export const authMiddleware: Middleware = (store) => (next) => async (action) => {
    const isExpired = checkTokenExpiration();
    if (isExpired) {
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        store.dispatch(clear());
      }
    }
  return next(action);
};

const checkTokenExpiration = (): boolean => {
  try {
    const exp = apiToken.getPayload()?.exp;
    if (exp) {
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    }
    return true;
  } catch {
    return true;
  }
};
