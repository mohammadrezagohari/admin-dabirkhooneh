import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
};


export const getWorksListCount = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/work/list?count=100", {
    headers: auth_header,
  });
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getJurorListCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("/admin/juror/list?count=100", {
      headers: auth_header,
    });
    // console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };

  export const getParticipantListCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("/admin/participants/list?count=100", {
      headers: auth_header,
    });
    // console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };

  export const getAssistantListCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("/admin/assistance/list?count=100", {
      headers: auth_header,
    });
    // console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };


  export const getPublicInfo = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("/public/information", {
      headers: auth_header,
    });
    // console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  export const getPublicChart = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("chart/message", {
      headers: auth_header,
    });
    // console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };

  export const getDashboardDetails = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("/dashboard/information", {
      headers: auth_header,
    });
    // console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
  export const getChartMessages = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get("chart/comment", {
      headers: auth_header,
    });
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  




  


