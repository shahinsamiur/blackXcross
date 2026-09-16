"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../state/redux/api/auth";
import { setCredentials, setAuthLoading, logout } from "../state/redux/slices/authSlice";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = !!getCookie("accessToken");
    setHasToken(token);
    dispatch(token ? setAuthLoading() : logout());
  }, [dispatch]);

  const { data, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setCredentials({ user: data.user }));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  return null;
}