import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api"
import { useDispatch } from "react-redux";
import { login } from "../reducers/Action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const loginSuccessFun = async () => {
      const success = await axios.get(`${baseUrl}/loginsuccess`, { withCredentials: true })
      console.log(success.data.result_data.uniqueid)
      dispatch(login(success.data.result_data.uniqueid));
      navigate("/")
    }
    loginSuccessFun();
  })
  return (
    <>
    </>
  );
};

export default Login;
