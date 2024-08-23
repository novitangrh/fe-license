// lib/api-bridge.ts
import axios, { AxiosError } from "axios";
import { useRuntimeConfig } from "#imports";

const getAxiosInstance = () => {
  const config = useRuntimeConfig();
  const BASE_API_URL = config.public.baseApiUrl as string | undefined;

  return axios.create({
    baseURL: BASE_API_URL,
  });
};

export const get = async (url: string) => {
  const axiosInstance = getAxiosInstance();
  try {
    const result = await axiosInstance.get(url);
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something went wrong`,
    };
  }
};

export const post = async (url: string, data: string | FormData) => {
  const axiosInstance = getAxiosInstance();
  try {
    const type =
      typeof data === "string" ? "application/json" : "multipart/form-data";
    const result = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": type,
      },
    });
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something went wrong`,
    };
  }
};

export const put = async (url: string, data: string | FormData) => {
  const axiosInstance = getAxiosInstance();
  try {
    const type =
      typeof data === "string" ? "application/json" : "multipart/form-data";
    const result = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": type,
      },
    });
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something went wrong`,
    };
  }
};

export const drop = async (url: string) => {
  const axiosInstance = getAxiosInstance();
  try {
    const result = await axiosInstance.delete(url);
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something went wrong`,
    };
  }
};
