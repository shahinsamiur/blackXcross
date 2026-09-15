"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../state/redux/slices/authSlice";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {

      dispatch(
        setCredentials({
          user: {
            id: "",
            email: "",
            username: "",
            avatarUrl: null,
          },
        })
      );
    }
  }, [dispatch]);

  return null;
}