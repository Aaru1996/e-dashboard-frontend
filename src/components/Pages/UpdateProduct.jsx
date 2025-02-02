import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./update.module.css";
import { Button, Heading, Input, useToast } from "@chakra-ui/react";

const UpdateProduct = () => {
  const [newData, setNewData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    company: "",
  });
  const [error, setError] = useState(false);
  const product_id = useParams().id;
  const navigate = useNavigate();
  const toast = useToast();
  const token = JSON.parse(localStorage.getItem("token")) || "";
  // console.log("token", token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
    console.log(name, value);
  };

  const handleUpdate = async () => {
    if (
      !newData.name ||
      !newData.price ||
      !newData.category ||
      !newData.company ||
      !newData.image
    ) {
      setError(true);
      return false;
    }

    let result = await fetch(`http://localhost:8000/products/${product_id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    result = await result.json();
    console.log(result);
    toast({
      title:'One product updated',
      duration:3000,
      position:'top-right',
      isClosable:true,
      status:'success'
    })
    navigate("/");

    // console.log(newData);
  };

  const getOldData = async () => {
    let result = await fetch(`https://e-dhashboard-backend.onrender.com/products/${product_id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    result = await result.json();
    setNewData({ ...result });

    // console.log(result);
  };

  useEffect(() => {
    getOldData();
  }, []);

  return (
    <div className={styles.container}>
      <Heading>Update product</Heading>
      <div>
        <p>Product Name*</p>
        <Input
          type="text"
          placeholder="Enter Product Name"
          name="name"
          value={newData.name}
          onChange={handleChange}
        />
        {error && !newData.name && (
          <p className={styles.error}>Enter a valid Name</p>
        )}
      </div>
      <div>
        <p>Image URL*</p>
        <Input
          tpe="url"
          placeholder="Enter url"
          name="image"
          value={newData.image}
          onChange={handleChange}
        />
        {error && !newData.image && (
          <p className={styles.error}>Enter a valid URL</p>
        )}
      </div>
      <div>
        <p>Product Price*</p>
        <Input
          type="number"
          placeholder="Enter Product Price"
          name="price"
          value={newData.price}
          onChange={handleChange}
        />
        {error && !newData.price && (
          <p className={styles.error}>Enter a valid Price</p>
        )}
      </div>
      <div>
        <p>Product Category*</p>
        <Input
          type="text"
          placeholder="Enter Product Category"
          name="category"
          value={newData.category}
          onChange={handleChange}
        />
        {error && !newData.category && (
          <p className={styles.error}>Enter a valid Category</p>
        )}
      </div>
      <div>
        <p>Product Company*</p>
        <Input
          type="text"
          placeholder="Enter Product Company Name"
          name="company"
          value={newData.company}
          onChange={handleChange}
        />
        {error && !newData.company && (
          <p className={styles.error}>Enter a valid Company</p>
        )}
      </div>

      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

export default UpdateProduct;
