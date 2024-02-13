import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  // Accept: "application/json",
  // Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
const auth_header_search = {
  "Content-type": "application/json; charset=UTF-8"
  // Accept: "application/json",
  // Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NlY3JldGFyaWF0LnJlcGFsLmlyL2FwaS92MS9hdXRoL2xvZ2luIiwiaWF0IjoxNzA0MTc3MjY1LCJleHAiOjE3MDY3NjkyNjUsIm5iZiI6MTcwNDE3NzI2NSwianRpIjoiTWRub3V5NHJXS1NzVzgxQyIsInN1YiI6IjM2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.XvGIYtUJcPhr4r6e3aAAKN5hl1Ed3dK2Yq_JrXCDCEI

// ---------------------------admin-------------------------------------


export const getArtsSearch = async (values, userToken) => {

  console.log(`values`,values);
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`work/search`,

    {
      title:values.title,
      tracking_code:values.tracking_code,
      category_id:values.category_id,
      status:values.status,
      type:values.type
      
     
    },
    {headers:auth_header}

   )
   if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const getassistanceSearch = async (values,userToken) => {
  console.log(`values`,values);
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`user/assistance/search`,

    {
      name:values.name,
      mobile:values.mobile,
      email:values.email,
      status:values.status,
      category_id:values.category_id,
      lang:values.lang,
     
    },
    {headers:auth_header}

   )
   if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getParticipantSearch = async (values,userToken) => {
  console.log(`values`,values);
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`user/participant/search`,

    {
      name:values.name,
      mobile:values.mobile,
      email:values.email,
      status:values.status,
      category_id:values.category_id,
      lang:values.lang,
     
    },
    {headers:auth_header}

   )
   if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getJurorSearch = async (values,userToken) => {
  console.log(`values`,values);
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`user/juror/search`,

    {
      name:values.name,
      mobile:values.mobile,
      email:values.email,
      status:values.status,
      category_id:values.category_id,
      lang:values.lang,
     
    },
    {headers:auth_header}

   )
   if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

//----------------------------------------------------------------


// export const getWorkSearch = async ({
//   userToken,
//   title = null,
//   tracking_code = null,
//   type = null,
//   status = null,
// }) => {
//   auth_header.Authorization = `${userToken}`;
//   let query = `work/search?`;
//   const temp_query = `work/search?`;
//   if (title) {
//     // query += `title=${title}`;
//     query += query === temp_query ? `title=${title}` : `&&title=${title}`;
//   }
//   if (tracking_code) {
//     query +=
//       query === temp_query
//         ? `tracking_code=${tracking_code}`
//         : `&&tracking_code=${tracking_code}`;
//   }
//   if (type) {
//     query += query === temp_query ? `type=${type}` : `&&type=${type}`;
//   }
//   if (status) {
//     query += query === temp_query ? `status=${status}` : `&&status=${status}`;
//   }
//   // if (name==null && mobile==null && email==null && lang==null && category_id==null && status==null) {
//   //   return query
//   // }
//   const response = await apiClient.get(query, {
//     headers: auth_header,
//   });
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };


export const getWorkSearch = async ({
  userToken,
  title = null,
  tracking_code = null,
  type = null,
  status = null,
}) => {
  auth_header.Authorization = `${userToken}`;
  //   let query = `work/search?`;
  //   const temp_query = `work/search?`;
  //   if (title) {
  //     // query += `title=${title}`;
  //     query += query === temp_query ? `title=${title}` : `&&title=${title}`;
  //   }
  //   if (tracking_code) {
  //     query +=
  //       query === temp_query
  //         ? `tracking_code=${tracking_code}`
  //         : `&&tracking_code=${tracking_code}`;
  //   }
  //   if (type) {
  //     query += query === temp_query ? `type=${type}` : `&&type=${type}`;
  //   }
  //   if (status) {
  //     query += query === temp_query ? `status=${status}` : `&&status=${status}`;
  //   }
  // if (name==null && mobile==null && email==null && lang==null && category_id==null && status==null) {
  //   return query
  // }
  const response = await apiClient.get("work/search", {
    params: {
      title: title,
      tracking_code: tracking_code,
      type: type,
      status: status,
    },
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


//-----------------------------------------------------

// export const getUserAssistanceSearch = async ({
//   ///simialar get method
//   userToken,
//   name = null,
//   mobile = null,
//   email = null,
//   lang = null,
//   category_id = null,
//   status = null,
// }) => {
//   auth_header.Authorization = `${userToken}`;
//   let query = `user/assistance/search?`;
//   const temp_query = `user/assistance/search?`;
//   if (name) {
//     // query += `name=${name}`;
//     query += query === temp_query ? `name=${name}` : `&&name=${name}`;
//   }
//   if (email) {
//     query += query === temp_query ? `email=${email}` : `&&email=${email}`;
//   }
//   if (mobile) {
//     query += query === temp_query ? `mobile=${mobile}` : `&&mobile=${mobile}`;
//   }
//   if (lang) {
//     if (lang !== "default")
//       query += query === temp_query ? `lang=${lang}` : `&lang=${lang}`;
//   }
//   if (category_id) {
//     query +=
//       query === temp_query
//         ? `category_id=${category_id}`
//         : `&&category_id=${category_id}`;
//   }
//   if (status) {
//     query += query === temp_query ? `status=${status}` : `&&status=${status}`;
//   }

//   // if (name==null && mobile==null && email==null && lang==null && category_id==null && status==null) {
//   //   return query
//   // }
//   const response = await apiClient.get(query, {
//     headers: auth_header,
//   });
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };

export const getUserAssistanceSearch = async ({
  ///simialar get method
  userToken,
  name = null,
  mobile = null,
  email = null,
  lang = null,
  category_id = null,
  status = null,
}) => {
  auth_header.Authorization = `${userToken}`;
  //   let query = `user/assistance/search?`;
  //   const temp_query = `user/assistance/search?`;
  //   if (name) {
  //     // query += `name=${name}`;
  //     query += query === temp_query ? `name=${name}` : `&&name=${name}`;
  //   }
  //   if (email) {
  //     query += query === temp_query ? `email=${email}` : `&&email=${email}`;
  //   }
  //   if (mobile) {
  //     query += query === temp_query ? `mobile=${mobile}` : `&&mobile=${mobile}`;
  //   }
  //   if (lang) {
  //     if (lang !== "default")
  //       query += query === temp_query ? `lang=${lang}` : `&lang=${lang}`;
  //   }
  //   if (category_id) {
  //     query +=
  //       query === temp_query
  //         ? `category_id=${category_id}`
  //         : `&&category_id=${category_id}`;
  //   }
  //   if (status) {
  //     query += query === temp_query ? `status=${status}` : `&&status=${status}`;
  //   }

  // if (name==null && mobile==null && email==null && lang==null && category_id==null && status==null) {
  //   return query
  // }
  const response = await apiClient.get("user/assistance/search", {
    params: {
      name: name,
      mobile: mobile,
      email: email,
      lang: lang,
      category_id: category_id,
      status: status,
    },
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

//----------------------------------------------------

export const getUserParticipantSearch = async ({
  userToken,
  name = null,
  mobile = null,
  email = null,
  lang = null,
  category_id = null,
  status = null,
}) => {
  auth_header.Authorization = `${userToken}`;
  let query = `user/participant/search?`;
  const temp_query = `user/participant/search?`;
  if (name) {
    // query += `name=${name}`;
    query += query === temp_query ? `name=${name}` : `&&name=${name}`;
  }
  if (email) {
    query += query === temp_query ? `email=${email}` : `&&email=${email}`;
  }
  if (mobile) {
    query += query === temp_query ? `mobile=${mobile}` : `&&mobile=${mobile}`;
  }
  if (lang) {
    if (lang !== "default")
      query += query === temp_query ? `lang=${lang}` : `&lang=${lang}`;
  }
  if (category_id) {
    query +=
      query === temp_query
        ? `category_id=${category_id}`
        : `&&category_id=${category_id}`;
  }
  if (status) {
    query += query === temp_query ? `status=${status}` : `&&status=${status}`;
  }
  // if (type) {
  //   query += query === temp_query ? `type=${type}` : `&&type=${type}`;
  // }
  // if (name==null && mobile==null && email==null && lang==null && category_id==null && status==null) {
  //   return query
  // }
  const response = await apiClient.get(query, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getUserJurorSearch = async ({
  userToken,
  name = null,
  mobile = null,
  email = null,
  lang = null,
  category_id = null,
  status = null,
}) => {
  auth_header.Authorization = `${userToken}`;
  let query = `user/juror/search?`;
  const temp_query = `user/juror/search?`;
  if (name) {
    // query += `name=${name}`;
    query += query === temp_query ? `name=${name}` : `&&name=${name}`;
  }
  if (email) {
    query += query === temp_query ? `email=${email}` : `&&email=${email}`;
  }
  if (mobile) {
    query += query === temp_query ? `mobile=${mobile}` : `&&mobile=${mobile}`;
  }
  if (lang) {
    query += query === temp_query ? `lang=${lang}` : `&&lang=${lang}`;
  }
  if (category_id) {
    query +=
      query === temp_query
        ? `category_id=${category_id}`
        : `&&category_id=${category_id}`;
  }
  if (status) {
    query += query === temp_query ? `status=${status}` : `&&status=${status}`;
  }
  // if (name==null && mobile==null && email==null && lang==null && category_id==null && status==null) {
  //   return query
  // }
  const response = await apiClient.get(query, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};



export const getJurorCommentsList =  async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `/juror/${unique_key}/comment/list?page=${currentPage}&limit=${itemsPerPage}`,
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




//====================================================================================

export const getAdminAssistanceList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `admin/assistance/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const postAdminNewAssistanceInfo = async (
  formData,
  unique_key,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `admin/assistance/${unique_key}/update/info`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAdminNewAssistanceStatus = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `admin/assistance/${unique_key}/update/status`,
    {},
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

export const postAdminNewAssistanceIR = async (formData, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`admin/assistance/new`, formData, {
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAdminNewAssistanceInternational = async (
  formData,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`admin/assistance/new`, formData, {
    method: "post",
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getAdminAssistanceDelete = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.delete(
    `admin/assistance/${unique_key}/delete`, {
      method: "DELETE",
      headers: auth_header,
    });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getAdminDeleteWorkComment = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.delete(`admin/work/comment/${unique_key}`, {
    method: "delete",
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getAdminParticipantsList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `admin/participants/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const getAdminParticipantsWorkCommentList = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `admin/participants/work/${unique_key}/comment/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const getAdminParticipantsWorkList = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `admin/participants/${unique_key}/work/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const getAdminJurorList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `admin/juror/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const getAdminJurorCommentList = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `admin/juror/${unique_key}/comment/list?page=${currentPage}&limit=${itemsPerPage}`,
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



export const getAdminJurorDelete = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.delete(
    `admin/juror/${unique_key}/delete`,
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

export const postAdminNewJurorStatus = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `admin/juror/${unique_key}/update/status`,
    {},
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

export const postAdminNewJurorInfo = async (
  formData,
  unique_key,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `admin/juror/${unique_key}/update/info`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

// ---------------------------assistance-------------------------------------

export const getAssistanceCategoryList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `assistance/category/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const postAssistanceInternationalNewJuror = async (
  formData,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`assistance/juror/new`, formData, {
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAssistanceInternalNewJuror = async (formData, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`assistance/juror/new`, formData, {
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAssistanceAddJurorNewCategory = async (
  formData,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/juror/category/add`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) { 
    return null;
  }
  return response?.data;
};

export const getAssistanceMyJurorList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `assistance/juror/list?page=${currentPage}&limit=${itemsPerPage}`,
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


export const getAssistanceJurorList = async (
  userToken,

) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `assistance/juror/list?count=2000`,
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


export const getAssistanceNewWorkList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `assistance/work/new?page=${currentPage}&limit=${itemsPerPage}`,
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
// assistance/work/${userToken}/juror/result
export const getAssistanceWorksList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `assistance/work/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const getAssistanceJurorResult = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `assistance/work/${unique_key}/juror/result?page=${currentPage}&limit=${itemsPerPage}`,
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

export const postAssistanceWorkConfirmation = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/work/${unique_key}/confirmation`,
    {},
    {
      method: "post",
      headers: auth_header,
      //   body : data
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAssistanceWorkFavorite = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/work/${unique_key}/favorite`,
    {},
    {
      method: "post",
      headers: auth_header,
      //   body : data
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAssistanceWorkRejection = async (
  formData,
  unique_key,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/work/${unique_key}/rejection`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getAssistanceJurorSearch = async ({
  userToken,
  mobile = null,
  email = null,
}) => {
  auth_header.Authorization = `${userToken}`;
  let query = `assistance/juror/search?`;
  // const temp_query = `assistance/juror/search?`;
  if (mobile) {
    query += `mobile=${mobile}`;
    // query = query===temp_query? `mobile=${mobile}`:`&&mobile=${mobile}`;
  }
  if (email) {
    query += `email=${email}`;
  }
  // if (mobile){
  //   query = `assistance/juror/search?mobile=${mobile}`;
  // }
  // if (email){
  //   query = `assistance/juror/search?email=${email}`;
  // }
  const response = await apiClient.get(query, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postAssistanceAddJurorWork = async (
  formData,
  unique_key,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/work/${unique_key}/juror/add`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getAssistanceJurorDelete = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.delete(
    `assistance/juror/${unique_key}/delete`,
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
 
export const postAssistanceNewJurorStatus = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/juror/${unique_key}/update/status`,
    {},
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

export const postAssistanceNewJurorInfo = async (
  formData,
  unique_key,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `assistance/juror/${unique_key}/update/info`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


// ---------------------------participant-------------------------------------

export const getParticipantMyWorkList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `participant/work/me?page=${currentPage}&limit=${itemsPerPage}`,
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

export const postParticipantNewWork = async (formData, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(`participant/work/new`, formData, {
    method: "post",
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getParticipantMyInfoWork = async (unique_key, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(`participant/work/${unique_key}/info`, {
    headers: auth_header,
  });
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

// ---------------------------juror user-------------------------------------

export const getJurorNewWorkList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `juror/work/new?page=${currentPage}&limit=${itemsPerPage}`,
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

export const getJurorWorkList = async (
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `juror/work/list?page=${currentPage}&limit=${itemsPerPage}`,
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

export const postJurorCommentWork = async (unique_key, formData, userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `juror/work/${unique_key}/result`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getJurorCommentWorkList = async (
  unique_key,
  userToken,
  currentPage = 1,
  itemsPerPage = 10
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(
    `juror/work/${unique_key}/result?page=${currentPage}&limit=${itemsPerPage}`,
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

// ---------------------------normal user-------------------------------------

export const postGuestCommentIRWork = async (
  unique_key,
  formData,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `guest/work/${unique_key}/result`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const postGuestCommentInternationalWork = async (
  unique_key,
  formData,
  userToken
) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `guest/work/${unique_key}/result`,
    formData,
    {
      method: "post",
      headers: auth_header,
    }
  );
  //   //console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

/******************** start Chart section *****************/

export const getUsersChart = async (userToken) => {
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.get(`/chart/user`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

/******************** end Chart section *****************/
