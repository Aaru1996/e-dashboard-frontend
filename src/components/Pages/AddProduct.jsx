import React, { useState } from "react";
import styles from "./addProduct.module.css";
import { Button, Heading, Input } from "@chakra-ui/react";

const AddProduct = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    company: "",
  });
  const [error, setError] = useState(false);
  const token = JSON.parse(localStorage.getItem("token")) || "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };
  const handleAdd = async () => {
    // for form validation
    console.log(!data.name);
    if (
      !data.name ||
      !data.price ||
      !data.category ||
      !data.company ||
      !data.image
    ) {
      setError(true);
      return false;
    }

    console.log(data);
    let result = await fetch("https://e-dhashboard-backend.onrender.com/products/add-product", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: userData._id }),
    });

    result = await result.json();
    console.log(result);
    setData({ name: "", price: "", category: "", company: "", image: "" });
    setError(false);
  };
  return (
    <div className={styles.container}>
      <Heading>Add product</Heading>
      <div>
        <p>Product Name*</p>
        <Input
         
          type="text"
          placeholder="Enter Product Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        {error && !data.name && (
          <p className={styles.error}>Enter a valid Name</p>
        )}
      </div>

      <div>
        <p>Product URL*</p>
        <Input
         
          type="url"
          placeholder="Enter image url"
          name="image"
          value={data.image}
          onChange={handleChange}
        />
        <br />
        {error && !data.image && (
          <p className={styles.error}>Enter a valid url</p>
        )}
      </div>

      <div>
        <p>Product Price*</p>
        <Input
         
          type="number"
          placeholder="Enter Product Price"
          name="price"
          value={data.price}
          onChange={handleChange}
        />
        <br />
        {error && !data.price && (
          <p className={styles.error}>Enter a valid Price</p>
        )}
      </div>
      <div>
        <p>Product Category*</p>
        <Input
       
          type="text"
          placeholder="Enter Product Category "
          name="category"
          value={data.category}
          onChange={handleChange}
        />
        <br />
        {error && !data.category && (
          <p className={styles.error}>Enter a valid Category</p>
        )}
      </div>
      <div>
        <p>Product Company Name*</p>
        <Input
         
          type="text"
          placeholder="Enter Product Company Name"
          name="company"
          value={data.company}
          onChange={handleChange}
        />
        <br />
        {error && !data.company && (
          <p className={styles.error}>Enter a valid Company</p>
        )}
      </div>

      <Button onClick={handleAdd}>Save</Button>
    </div>
  );
};

export default AddProduct;
