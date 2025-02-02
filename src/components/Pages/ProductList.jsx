import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./productList.module.css";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Hide,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Show,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(8);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ name: "price", order: "lth" });
  const [filter, setFilter] = useState([]);
  const [filterObj, setFilterObj] = useState({
    mobile: false,
    laptop: false,
    desktop: false,
  });
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token")) || "";
  let localFilter = JSON.parse(localStorage.getItem("filter"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    let result = await fetch(
      `https://e-dhashboard-backend.onrender.com/products?page=${page}&limit=${limit}&search=${search}&sort=${
        sort.name
      },${sort.order}&filter=${filter.join(",")}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    result = await result.json();
    console.log("result", result);

    if (result.data && result.dataCount) {
      setProducts(result.data);
      setDataCount(result.dataCount);
    } else {
      setProducts([]);
      setDataCount(0);
    }
    setLoading(false);
    console.log(result.data, result.dataCount);
  };

  // const handleDelete = async (id) => {
  //   let result = await fetch(`http://localhost:8000/products/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `bearer ${token}`,
  //     },
  //   });
  //   result = await result.json();
  //   console.log(result);
  //   //  to show toast message
  //   toast({
  //     title: "Item Deleted Successfully",
  //     duration: 3000,
  //     isClosable: true,
  //     status: "success",
  //     position: "top-right",
  //   });
  //   getProducts();
  // };
  const handleSearch = (e) => {
    let key = e.target.value;
    setSearch(key);
    // if (key) {
    //   let result = await fetch(`http://localhost:8000/products?search=${key}&page=${page}&limit=${limit}`, {
    //     headers: {
    //       Authorization: `bearer ${token}`,
    //     },
    //   });
    //   result = await result.json();
    //   setProducts(result.data);
    //   setDataCount(result.dataCount);
    //   console.log(result.data,result.dataCount);
    // } else {
    //   getProducts();
    // }
  };
  const handleSelect = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSort({ ...sort, name: name, order: value });
    setPage(1);
  };
  const handleFilter = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFilter([...filter, name]);
      setFilterObj({ ...filterObj, [name]: true });
    } else {
      let updatedFilter = filter.filter((e) => e !== name);
      setFilter(updatedFilter);
      setFilterObj({ ...filterObj, [name]: false });
    }

    setPage(1);
    console.log(filterObj);
    // to close filter model in obile view
    setTimeout(() => {
      onClose();
    }, 1000);
  };
  // pagination
  const tolatPage = Math.ceil(dataCount / limit);

  const handleDiv = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, [page, limit, search, sort, filter]);

  useEffect(() => {
    if (localFilter) {
      setFilterObj(localFilter);
      for (var key in localFilter) {
        if (localFilter[key]) filter.push(key);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filterObj));
  }, [filterObj]);
  return (
    <div>
      <div className={styles.products}>
        <div className={styles.filter}>
          <Hide below="sm">
            <p>Fiter By Category</p>
            <div>
              <p>Mobile</p>
              <input
                type="checkbox"
                checked={filterObj.mobile}
                name="mobile"
                onChange={handleFilter}
              />
            </div>
            <div>
              <p>Laptop</p>
              <input
                type="checkbox"
                checked={filterObj.laptop}
                name="laptop"
                onChange={handleFilter}
              />
            </div>
            <div>
              <p>DeskTop</p>
              <input
                type="checkbox"
                checked={filterObj.desktop}
                name="desktop"
                onChange={handleFilter}
              />
            </div>
          </Hide>
        </div>
        <Show below="sm">
          <div className={styles.filterSort}>
            <div className={styles.filter} onClick={onOpen}>
              <Image
                boxSize="20px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdayOzZttuQ08GfQk6d5fxnyGt6CEqq_e6Q&s"
              />
              <span>Filter</span>
            </div>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  Filter By category
                </DrawerHeader>
                <DrawerBody>
                  <div className={styles.mobileFilter}>
                    <div>
                      <span>Mobile</span>
                      <input
                        type="checkbox"
                        checked={filterObj.mobile}
                        name="mobile"
                        onChange={handleFilter}
                      />
                    </div>
                    <div>
                      <span>Laptop</span>
                      <input
                        type="checkbox"
                        checked={filterObj.laptop}
                        name="laptop"
                        onChange={handleFilter}
                      />
                    </div>
                    <div>
                      <span>DeskTop</span>
                      <input
                        type="checkbox"
                        checked={filterObj.desktop}
                        name="desktop"
                        onChange={handleFilter}
                      />
                    </div>
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <div className={styles.select}>
              <select name="price" defaultValue="lth" onChange={handleSelect}>
                <option value="htl">Price: High to Low</option>
                <option value="lth">Price: Low to High</option>
              </select>
            </div>
          </div>
        </Show>
        <div className={styles.productList}>
          <div className={styles.searchSelect}>
            <div className={styles.search}>
              <div>
                <InputGroup>
                  <InputLeftAddon pointerEvents="none">
                    <Img width="10px" src="/images/magnifying-glass.png" />
                  </InputLeftAddon>
                  <Input
                    type="text"
                    placeholder="Search Products"
                    onChange={handleSearch}
                  />
                </InputGroup>
              </div>

              {/* <Input
                type="text"
                placeholder="Search Products"
                onChange={handleSearch}
              /> */}
            </div>
            <Hide below="sm">
              <div className={styles.select}>
                <select name="price" defaultValue="lth" onChange={handleSelect}>
                  <option value="htl">Price: High to Low</option>
                  <option value="lth">Price: Low to High</option>
                </select>
              </div>
            </Hide>
          </div>

          <div className={styles.productMap}>
            {products?.map((e) => (
              <div
                key={e._id}
                className={styles.productMap2}
                onClick={() => handleDiv(e._id)}
              >
                <div className={styles.productImage}>
                  <div>
                    <img src={e.image} alt={e.name} />
                  </div>
                </div>
                <div>
                  <div>
                    {" "}
                    {e.name} {e.company} {e.category}
                  </div>
                  <div>
                    <strong>
                      <center> ₹{e.price}</center>
                    </strong>
                  </div>
                </div>
                <div>
                  {/* <button onClick={() => handleDelete(e._id)}>Delete</button> */}
                  {/* <Link to={`/update/${e._id}`}>Update</Link> */}
                  {/* <Button>Add To Cart </Button> */}
                </div>
              </div>
            ))}
          </div>

          {/* <div className={styles.loading}>
            {products.length === 0 && !loading && (
              <Heading textAlign={"center"}>No Products Found</Heading>
            )}
            {products.length === 0 && loading && <Spinner size="xl" />}
          </div> */}
          <div className={styles.pagination}>
            {new Array(tolatPage).fill().map((e, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={
                  page === i + 1
                    ? styles.paginationActive
                    : styles.paginationInactive
                }
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* <div className={styles.pagination}>
        {new Array(tolatPage).fill().map((e, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={
              page === i + 1
                ? styles.paginationActive
                : styles.paginationInactive
            }
          >
            {i + 1}
          </button>
        ))}
      </div> */}

    { products.length===0 && (<div className={styles.loading}>
        {products.length === 0 && !loading && (
          <Heading textAlign={"center"}>No Products Found</Heading>
        )}
        {products.length === 0 && loading && <Spinner size="xl" />}
      </div>)}
    </div>
  );
};

export default ProductList;
