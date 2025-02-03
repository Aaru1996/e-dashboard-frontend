import { Button, Heading, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  // const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    let result = await fetch(
      `https://e-dhashboard-backend.onrender.com/cart?cartUserId=${user._id}`,
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    result = await result.json();
    setLoading(false);
    console.log(result);

    let totalPrice =
      result &&
      result.data?.reduce((acc, curr) => {
        return acc + curr.totalPrice;
      }, 0);
    setTotalPrice(totalPrice);

    if(result && result.data)
    setData(result.data);
    setCount(result.dataCount);

    if (result && result.dataCount)
      localStorage.setItem("cartItem", result.dataCount);
    else localStorage.setItem("cartItem", 0);
  };

  const handleInc = async (id) => {
    var objBody = {};
    data.map((e) => {
      if (e._id === id) {
        objBody.qty = ++e.qty;
        objBody.totalPrice = e.price * e.qty;
      }
    });

    console.log(objBody);

    let result = await fetch(
      `https://e-dhashboard-backend.onrender.com/cart/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(objBody),
      }
    );

    result = await result.json();
    console.log(result);

    getData();
  };

  const handleDec = async (id) => {
    var objBody = {};
    data.map((e) => {
      if (e._id === id) {
        objBody.qty = --e.qty;
        objBody.totalPrice = e.totalPrice - e.price;
      }
    });

    // console.log(objBody)

    let result = await fetch(
      `https://e-dhashboard-backend.onrender.com/cart/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(objBody),
      }
    );

    result = await result.json();
    console.log(result);

    getData();
  };

  const handleRemove = async (id) => {
    let result = await fetch(
      `https://e-dhashboard-backend.onrender.com/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    result = await result.json();

    console.log(result);
    getData();
  };

  const handlePlaceOrder = async (id) => {
    console.log(id);
    let result = await fetch(
      `https://e-dhashboard-backend.onrender.com/cart/deleteCart/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    result = await result.json();

    // console.log(result);
    toast({
      title: `Order placed successully`,
      description: `You have ordered ${count} item and total price is ${totalPrice}`,
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top-right",
    });

    setTimeout(() => {
      getData();
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Heading textAlign={"center"} fontSize="20px">
        {count >= 0
          ? `There ${count === 1 ? "is" : "are"} ${count} items in the Cart`
          : "Your cart is empty"}
      </Heading>
      {data.length === 0 && loading && (
        <div className={styles.loading}>
          <Spinner size="xl" />
        </div>
      )}

      {data?.map((e) => (
        <div key={e._id} className={styles.container}>
          <div className={styles.image}>
            <img src={e.image} alt={e.name} />
          </div>
          <div className={styles.buttonParent}>
            <div>
              <p>
                {e.name} {e.company} {e.category}
              </p>
              <p>
                <strong>₹{e.totalPrice}</strong>
              </p>
              <div className={styles.qtyDiv}>
                <Button disabled={e.qty === 1} onClick={() => handleDec(e._id)}>
                  -
                </Button>
                <span>{e.qty}</span>
                <Button onClick={() => handleInc(e._id)}>+</Button>
              </div>
            </div>

            <div className={styles.button}>
              <Button
                className={styles.delete}
                onClick={() => handleRemove(e._id)}
              >
                REMOVE
              </Button>
            </div>
          </div>
        </div>
      ))}

      {count >= 0 && (
        <div className={styles.checkout}>
          <p>
            TotalPrice: <strong>₹{totalPrice}</strong>
          </p>
          <Button
            bgColor="#2874F0"
            color="white"
            className={styles.order}
            onClick={() => handlePlaceOrder(data[0].cartUserId)}
          >
            PLACE ORDER
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
