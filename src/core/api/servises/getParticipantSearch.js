import apiClient from "../apiClient";
import { auth_header } from "./users";

export const getParticipantSearch = async (values, userToken) => {
  console.log(`values`, values);
  auth_header.Authorization = `${userToken}`;
  const response = await apiClient.post(
    `user/participant/search`,

    {
      name: values.name,
      mobile: values.mobile,
      email: values.email,
      status: values.status,
      category_id: values.category_id,
      lang: values.lang,
    },
    { headers: auth_header }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
