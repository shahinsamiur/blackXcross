"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../state/redux/api/auth";
import {
  setCredentials,
  setAuthLoading,
  logout,
} from "../state/redux/slices/authSlice";
import type { RootState } from "../state/redux/store";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth?.user);
  const { data, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: !!user,
  });
  useEffect(() => {
    if (!user) {
      dispatch(setAuthLoading());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setCredentials({ user: data.data }));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  return null;
}
