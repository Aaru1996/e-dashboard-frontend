import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { Button, Heading, Input, useToast } from "@chakra-ui/react";
// import Toast from "./Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(email, password);
    if (!email || !password) {
      setError(true);
      // console.log(error);
      return false;
    }
    let loginData = { email, password };
    logIn(loginData);
    // setEmail("");
    // setPassword("");
  };

  const logIn = async (loginData) => {
    let result = await fetch("https://e-dhashboard-backend.onrender.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    let data = await result.json();
    if (data && data.data && data.data.name) {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", JSON.stringify(data.token));

      setError(false);
      // toast message
      toast({
        title: "Login Successfully",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      toast({
        title: "User Not found. Sign up first to login",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // alert("user Not found. Sign up first to login");
      navigate("/signup");
    }
    console.log(data);
  };

  return (
    <div>
      <div className={styles.container}>
        <Heading>Login</Heading>
        <div>
          <p>Email*</p>
          <Input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <p className={styles.error}>Please Enter a Valid Email</p>
          )}
        </div>

        <div>
          <p>Password*</p>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <p className={styles.error}>Please Enter a Valid password</p>
          )}
        </div>

        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
