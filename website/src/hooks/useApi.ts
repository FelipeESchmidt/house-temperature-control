"use client";

import api from "@/services/axios";
import { useEffect } from "react";

export const useApi = () => {
  useEffect(() => {
    api.defaults.baseURL = `${window.location.origin}/api`;
  }, []);

  const postChangeAirState = async (sensor: string, on: boolean) => {
    return api
      .post("/changeAirState", { sensor, on })
      .then(({ data }: { data: any }) => data);
  };

  return { postChangeAirState };
};
