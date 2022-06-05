import axios from "axios";
import { getMockServer, getHostedServer } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const loginUser = (email, magicLink) => {
  // TODO: cambia aqui el servidor
  // const apiUrl = getMockServer("/auth/login");
  const apiUrl = getHostedServer("/auth/login");
  const correctedEmail = email.toLowerCase().trim();
  const data = {
    email: correctedEmail,
    magicLink,
  };

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "dark",
};

  axios.post(apiUrl, data)
    .then((res) => {
      if (res.data.token) {
        console.log(res)
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(`${res.data.message}`, toastOptions);
        return true;
      } else {
        toast.success(`${res.data.message}`, toastOptions);
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const verifyToken = async (token) => {
  

  if (token === null) {
    return false;
  }
  // const apiUrl = getMockServer("/auth/verify");
  const apiUrl = getHostedServer("/auth/verify");
  const data = {
    token,
  };
  const res = await axios.post(apiUrl, data);
  if (res.data.token) {
  
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return true;
  }
  //localStorage.removeItem("token");
  return false;


};

export const logoutUser = (email) => {
  
  const apiUrl = getHostedServer("/auth/logout");
  const data = {
    email: email
  };
  const res = axios.post(apiUrl, data);
  console.log(res)

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
};
