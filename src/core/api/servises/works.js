import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
};

export const getWorkLists = async (userToken) => {
  auth_header.Authorization = ` Bearer ${userToken}`;
  const response = await apiClient.get("work/list?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getJurorsCommentsPerWork = async (unique_key, userToken) => {
  auth_header.Authorization = ` Bearer ${userToken}`;
  const response = await apiClient.get(
    `work/${unique_key}/juror/result?count=100`,
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getGeustCommentsPerWork = async (unique_key, userToken) => {
  auth_header.Authorization = ` Bearer ${userToken}`;
  const response = await apiClient.get(
    `work/${unique_key}/guest/result?count=100`,
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

/******************** start Chart section *****************/
export const getWorkChart = async (userToken) => {
  auth_header.Authorization = ` Bearer ${userToken}`;
  const response = await apiClient.get("/chart/work", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
/******************** end Chart section *****************/
