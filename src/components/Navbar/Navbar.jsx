import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import {
  Hide,
  Show,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Image,
  useToast,
} from "@chakra-ui/react";
import { CartContext } from "../contextApi/CartContext";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const {count,setCount}  = useContext(CartContext)
  
  let data = JSON.parse(localStorage.getItem("user")) || [];
  // let cartItem = localStorage.getItem('cartItem') || 0
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("cartItem")
    // toast message
    toast({
      title: "Logged out",
      isClosable: true,
      duration: 3000,
      status: "success",
      position: "top-right",
    });

    navigate("/login");
  };
  const handleIcon = () => {
    navigate("/");
  };
  return (
    <div className={styles.navbar}>
      <div id={styles.icon} onClick={handleIcon}>
        <img
          src="https://png.pngtree.com/png-vector/20230705/ourmid/pngtree-electronic-store-logo-vector-png-image_7481117.png"
          alt="icon"
        />
      </div>

      <Hide breakpoint="(max-width: 480px)">
        <div>
          <div className={styles.link}>
            <Link to="/">Products</Link>
          </div>
          <div>
            <Link to="/add">Add Product</Link>
          </div>
          <div>
            <Link to="/cart">Cart </Link>
            <span className={styles.cartItem}>{count !==0 ? count : ""}</span>
          </div>
          {data && data.name ? (
            <div>
              <Link to="/signup" onClick={handleLogout}>
                Logout({data.name})
              </Link>
            </div>
          ) : (
            <>
              <div>
                <Link to="/signup">SignUp</Link>
              </div>

              <div>
                <Link to="/login">Login</Link>
              </div>
            </>
          )}
        </div>
      </Hide>

      <Show below="sm">
        <>
          <Button ref={btnRef} colorScheme="#2874F0" onClick={onOpen}>
            <Image
              w="30px"
              h="30px"
              src="https://cdn3.iconfinder.com/data/icons/photo-camera-ui/512/mobile-navigation-bar-menu-responsive-ui-512.png"
            />
          </Button>
          <Drawer
            size={"xs"}
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <Button
                ref={btnRef}
                colorScheme="#2874F0"
                bgColor="#2874F0"
                onClick={onClose}
                display="flex"
                //  border="1px solid red"
                justifyContent="end"
              >
                <Image
                  w="30px"
                  h="30px"
                  src="https://cdn3.iconfinder.com/data/icons/photo-camera-ui/512/mobile-navigation-bar-menu-responsive-ui-512.png"
                />
              </Button>
              <DrawerBody>
                <div className={styles.mobileNavbar}>
                  <div className={styles.link}>
                    <Link to="/" onClick={onClose}>
                      Products
                    </Link>
                  </div>
                  <div>
                    <Link to="/add" onClick={onClose}>
                      Add Product
                    </Link>
                    <div onClick={onClose}>
                      <Link to="/cart">Cart</Link>
                      <span className={styles.cartItem}>{count !==0 ? count : ""}</span>
                    </div>
                  </div>
                  {data && data.name ? (
                    <div onClick={onClose}>
                      <Link to="/signup" onClick={handleLogout}>
                        Logout({data.name})
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div>
                        <Link to="/signup" onClick={onClose}>
                          SignUp
                        </Link>
                      </div>

                      <div>
                        <Link to="/login" onClick={onClose}>
                          Login
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      </Show>
    </div>
  );
};

export default Navbar;
