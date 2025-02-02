import { Button, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signUp.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const toast=useToast();
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem("user")) || [];

  const handleSignUp = () => {
    const formData = { name: name, email: email, password: password };
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    form(formData);
    // navigate("/");
  };

  const form = async (formData) => {
    let result = await fetch("https://e-dhashboard-backend.onrender.com/user/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data = await result.json();
    localStorage.setItem("user", JSON.stringify(data.result));
    localStorage.setItem("token", JSON.stringify(data.token));
    setError(false);
    toast({
       title:"Sign Up Successfully",
       duration:3000,
       status:'success',
       isClosable:true,
       position:'top-right'
    })
    navigate("/");
    // console.log(data);
    // setName("");
    // setEmail("");
    // setPassword("");
  };

  useEffect(() => {
    if (data.name) navigate("/");
  },[]);

  return (
    <div className={styles.container}>
      <Heading>Sign Up</Heading>
      <div>
        <p>Name*</p>
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <p className={styles.error}>Please Enter a valid Name</p>
        )}
      </div>
      <div>
        <p>Email*</p>
        <Input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && (
          <p className={styles.error}>Please Enter a valid Email</p>
        )}
      </div>
      <div>
        <p>Password*</p>
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && (
          <p className={styles.error}>Please Enter a valid Password</p>
        )}
      </div>

      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
};

export default SignUp;
