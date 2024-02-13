import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  // Accept: "application/json",
  // Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getGeneralGategoryList = async () => {
  const response = await apiClient.get("/category/list?count=100", {
    method: "get",
    redirect: "follow",
  });
  // //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getGeneralArtList = async (currentPage = 1, itemsPerPage = 10) => {
  const response = await apiClient.get(
    `/work/list?page=${currentPage}&limit=${itemsPerPage}`,
    {
      method: "get",
      redirect: "follow",
    }
  );
  // //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getAuthGeneralArtList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `/work/list?page=${currentPage}&limit=${itemsPerPage}`,
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

// ----------------------------------------------------------------

export const getListGuestCommentsWork = async (
  unique_key,
  currentPage = 1,
  itemsPerPage = 10
) => {
  const response = await apiClient.get(
    `/work/${unique_key}/guest/result?page=${currentPage}&limit=${itemsPerPage}`,
    {
      method: "get",
      redirect: "follow",
    }
  );
  // //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getListAuthGuestCommentsWork = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  // console.log("userToken",userToken);
  const response = await apiClient.get(
    `/work/${unique_key}/guest/result?page=${currentPage}&limit=${itemsPerPage}`,
    {
      method: "get",
      headers: auth_header,
    }
  );
  // //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getListJurorCommentsWork = async (
  unique_key,
  currentPage = 1,
  itemsPerPage = 10
) => {
  const response = await apiClient.get(
    `/work/${unique_key}/juror/result?page=${currentPage}&limit=${itemsPerPage}`,
    {
      method: "get",
      redirect: "follow",
    }
  );
  // //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getListAuthJurorCommentsWork = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  // console.log("userToken",userToken);
  const response = await apiClient.get(
    `/work/${unique_key}/juror/result?page=${currentPage}&limit=${itemsPerPage}`,
    {
      method: "get",
      headers: auth_header,
    }
  );
  // //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getWorkDetails = async (tracking_code) => {
  const response = await apiClient.get(`work/${tracking_code}/info`);
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const getAuthWorkDetails = async (tracking_code, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(`work/${tracking_code}/info`, {
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postOtpVerify = async (
  unique_key,
  formData
  // userToken
) => {
  // auth_header.Authorization = `${userToken}`;
  //https://dabirkhane.mohammadrasoulollah.com/core/api/v1//guest/work/esfGL2T3/verify

  const response = await apiClient.post(
    `guest/work/${unique_key}/verify`,
    formData
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const publicApi = async () => {
  const response = await apiClient.get(`public/information`, {
    headers: {
      "Accept-Language":
        localStorage.getItem("public_current_Language") ?? "fa",
    },
  });

  if (response.status !== 200) {
    return null;
  }
  return response?.data;
}; 
