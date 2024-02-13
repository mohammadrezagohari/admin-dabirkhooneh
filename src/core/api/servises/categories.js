import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  // Accept: "application/json",
  // Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getAdminCategoryList = async (userToken,currentPage=1,itemsPerPage=10) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(`admin/category/list?page=${currentPage}&limit=${itemsPerPage}`, {
    headers: auth_header,
  });
//   console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getCategoryList = async (currentPage=1,itemsPerPage=10) => {
  // auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(`category/list?page=${currentPage}&limit=${itemsPerPage}`, {
    headers: auth_header,
  });
//   console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAdminAdddNewCategory = async (formData, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`admin/category/new`, formData, {
    method: "post",
    headers: auth_header,
  });
//   console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAdminUpdateCategory = async (
  unique_key,
  formData,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `admin/category/${unique_key}/update`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
//   console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const adminDeleteCategory = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.delete(
    `admin/category/${unique_key}/delete`,
    {
      method: "delete",
      headers: auth_header,
    }
  );
//   console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAdminShangeStatusCategory = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `admin/category/${unique_key}/status`,
    {},
    {
      headers: auth_header,
    }
  );
//   console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
