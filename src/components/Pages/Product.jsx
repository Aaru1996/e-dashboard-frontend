import { Box, Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./product.module.css";

const Product = () => {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token")) || "";
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const [itemAdded, setItemAdded] = useState(false)
//   console.log(id);
console.log("user", user)

  const getData = async () => {
    let result = await fetch(`https://e-dhashboard-backend.onrender.com/products/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    result = await result.json();
    setData(result);
    console.log(result);
  };
const handleAddToCart=async()=>{
     let result = await fetch(`https://e-dhashboard-backend.onrender.com/cart`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              Authorization:`bearer ${token}`
          },
          body: JSON.stringify({...data, cartUserId:user._id, qty:1, totalPrice:data.price})
     })
     result = await result.json();
     if(result){
   setItemAdded(true)
     }
     console.log(result)
     toast({
      title:`${data.name} is added to cart`,
      // description:`You have ordered ${count} item and total price is ${totalPrice}`,
      duration:3000,
      isClosable:true,
      status:'success',
      position:'top-right'
    })
        navigate('/cart')
}

const handleUpdate = (id)=>{
      navigate(`/update/${id}`)
}

const handleDelete = async (id) => {
  let result = await fetch(`https://e-dhashboard-backend.onrender.com/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  result = await result.json();
  console.log(result);
  //  to show toast message
  toast({
    title: `Item ${data.name} Deleted Successfully`,
    duration: 3000,
    isClosable: true,
    status: "success",
    position: "top-right",
  });
    setTimeout(() => {
        navigate('/')
    }, 3000);
};

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={data.image} alt={data.name}/>
      </div>
      <div className={styles.buttonParent}>
        <div>
          <p>
            {" "}
            {data.name} {data.company} {data.category}
          </p>
          <p>
            <strong>₹{data.price}</strong>
          </p>
        </div>
        <div className={styles.button}>
          <Box>
            <Button onClick={()=>handleDelete(data._id)} className={styles.delete}>DELETE</Button>
          </Box>
          <Box>
            <Button onClick={()=>handleUpdate(data._id)} className={styles.update}>UPDATE</Button>
          </Box>
          <Box>
            <Button className={styles.addToCart} onClick={handleAddToCart}>ADD TO CART</Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Product;
