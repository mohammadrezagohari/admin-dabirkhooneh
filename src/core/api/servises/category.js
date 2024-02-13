import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
};

export const getCategory = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/admin/category/list?count=100", {
    headers: auth_header,
  });
//   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createCategory = async (values,userToken) => {
  auth_header.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/admin/category/new`,
    {
      name: values.name,
      description: values.description,
    },
    {
      headers: auth_header,
    }
  );
//   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteCategoty = async (unique_key, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`/admin/category/${unique_key}/delete`, {
    headers: auth_header,
  });
//   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};