/** @format */

import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "multipart/form-data",
  "Accept": "application/json",
};

export const uploadFile = async (values, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `participants/media/upload`,
    {
      file: values?.file,
    },
    {
      headers: auth_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteFile = async (unique_key, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(
    `participants/media/${unique_key}/delete`,
    {
      headers: auth_header,
    }
  );
  if (!response.status) {
    return null;
  }
  return response?.data;
};
