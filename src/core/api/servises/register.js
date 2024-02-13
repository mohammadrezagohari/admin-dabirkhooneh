import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header_fa = {
  "Content-Type": "application/json",
  "Accept-Language":"fa"
};
const auth_header_en = {
  "Content-Type": "application/json",
  "Accept-Language":"en"
};
const auth_header_ar = {
  "Content-Type": "application/json",
  "Accept-Language":"ar"
};
 const auth_header ={
  "Content-Type": "application/json",
 }

const fa_login_header={
  "Accept-Language": "fa",
  "Content-Type": "application/json"
}
const en_login_header={
  "Accept-Language": "en",
  "Content-Type": "application/json"
}
const ar_login_header={
  "Accept-Language": "ar",
  "Content-Type": "application/json"
}




// export const completeUserInfo = async (values,userToken) => {
//   auth_complete.Authorization =` Bearer ${userToken}`;
//   const response = await apiClient.post(
//     `/auth/complete`,
//     {
//       name: values.name,
//     },
//     {
//       headers: auth_complete,
//     }
//   );
//   console.log("status", response);
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };
 
export const regByMobile = async (values) => {
  const response = await apiClient.post(
    `/auth/register`,
    {
      name:values.name,
      mobile:values.mobile,
      password:values.password,
    },
    {
      headers: auth_header_fa,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const regByEmail = async (values) => {
  const response = await apiClient.post(
    `/auth/register`,
    {
      name:values.name,
      email:values.email,
      password:values.password,
    },
    {
      headers: auth_header_en,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const regByEmailAr = async (values) => {
  const response = await apiClient.post(
    `/auth/register`,
    {
      name:values.name,
      email:values.email,
      password:values.password,
    },
    {
      headers: auth_header_ar,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const verifyUser = async (values,userToken) => {
  auth_header_en.Authorization =`Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/verify`,
    {
      unique_key: values.unique_key,
      code: values.code,
    },
    {
      headers: auth_header_en,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const verifyUserFa = async (values,userToken) => {
  auth_header_en.Authorization =`Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/verify`,
    {
      unique_key: values.unique_key,
      code: values.code,
    },
    {
      headers: auth_header_fa,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const verifyUserAr = async (values,userToken) => {
  auth_header_en.Authorization =`Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/verify`,
    {
      unique_key: values.unique_key,
      code: values.code,
    },
    {
      headers: auth_header_ar,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};



export const regForeignUser = async (values,userToken) => {
  auth_header_en.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/login`,
    {
      unique_key: values.unique_key,
      code: values.code,
    },
    {
      headers: auth_header_en,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const logOutUser = async (userToken) => {
  auth_header_en.Authorization =`${userToken}`;
  const response = await apiClient.post(
    `/auth/revoke`,
    {},
    {
      headers: auth_header_en,
    }
  );
  console.log("status", response);
  console.log("token in register logout", userToken);

  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const logByPassAndEmail = async (values) => {
  // auth_header_en.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/login`,
    {
      email:values.email,
      password:values.password,
    },
    {
      headers: en_login_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const logByPassAndEmailAr = async (values) => {
  // auth_header_en.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/login`,
    {
      email:values.email,
      password:values.password,
    },
    {
      headers: ar_login_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const logByPassAndMobile = async (values) => {
  // auth_header_en.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/login`,
    {
      mobile:values.mobile,
      password:values.password,
    },
    {
      headers: fa_login_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const logByEmailAndOTP = async (values) => {
  // auth_header_en.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/login`,
    {
      email:values.email,
    },
    {
      headers: en_login_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const logByEmailAndOTPAr = async (values) => {
  // auth_header_en.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.post(
    `/auth/login`,
    {
      email:values.email,
    },
    {
      headers: ar_login_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const logByMobileAndOTP = async (values) => {
  const response = await apiClient.post(
    `/auth/login`,
    {
      mobile:values.mobile,
    },
    {
      headers: fa_login_header,
    }
  );
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const updateProfile = async (values,userToken) => {
    auth_header.Authorization =` Bearer ${userToken}`;
  const response = await apiClient.patch(
    `profile/update`,
    {
      name:values.name,
      password:values.password,
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




// https://dabirkhane.mohammadrasoulollah.com/core/api/v1/auth/validity


export const checkAuth = async (userToken) => {
  auth_header.Authorization = userToken;
  // console.log('check token in register ',userToken);
  const response = await apiClient.post("/auth/validity",
  {}
  , {
    headers: auth_header,
  });
  // console.log("status", response);

  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};