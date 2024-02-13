import apiClient from "../apiClient";

const auth_header = {
    "Content-Type": "application/json",
};


export const signIn = async (mobile, password) => {

    const {data} = await apiClient.post("auth/login", {
        mobile: mobile, password: password,
    }, {
        headers: auth_header,
    });
    return data;
};

export const userRegister = async (name, mobile, password) => {
    const {data} = await apiClient.post("auth/register", {
        name: name, mobile: mobile, password: password,
    }, {
        headers: auth_header,
    });
    return data;
};






export const logOut = async (field, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.post(`/field/store`, {
        name: field,
    }, {
        headers: auth_header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};
