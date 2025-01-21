import axios from "axios";
const BASE_URL = "https://sandbox.vovpos.com:3002/web";

export async function forgotPassword(email) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email_address: email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.MESSAGE || "Login failed");
    }
    throw error;
  }
}

export async function resetPassword(email, otp, password, confirm_password) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email_address: email,
      otp: otp,
      password: password,
      confirm_password: confirm_password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.MESSAGE || "Login failed");
    }
    throw error;
  }
}

export async function checkoutasguest(
  first_name,
  last_name,
  email_address,
  mobile_number,
  gender
) {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      first_name: first_name,
      last_name: last_name,
      email_address: email_address,

      mobile_number: mobile_number,

      gender: gender,
      is_login_as_guest: "1",
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.MESSAGE || "Login failed");
    }
    throw error;
  }
}
