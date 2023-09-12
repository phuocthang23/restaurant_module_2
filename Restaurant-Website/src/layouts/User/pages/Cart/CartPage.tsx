/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  apiPostOrderProducts,
  getOneUser,
  putOneUser,
  apiPutOrder,
} from "../../../../api";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
// import Table from "../../components/table/table";
// import CartSide from "../../components/CartSide/CartSide";

const CartPage: React.FC = () => {
  const [user, setUser] = useState<any>([]);
  // const [order, setOrder] =
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    ship: 13000,
    district: "Hải Châu", // Mặc định chọn Hải Châu
  });

  const getData = JSON.parse(localStorage.getItem("Auth") || '""') || "";

  useEffect(() => {
    const data = async () => {
      const response = await getOneUser(getData.userID);
      setUser(response);
    };
    data();
  }, []);

  // useEffect(() => {
  //   const data = async () => {
  //     const response = await getAllProducts();
  //     setUser(response);
  //   };
  //   data();
  // }, []);

  const CartProduct = user.cart || [];

  //* --------------------------------------(delete) --------------------------------------

  const handldeDelete = async (idProduct: number) => {
    const removeProduct = CartProduct.filter(
      (product: any) => product.idProduct !== idProduct
    );

    const removeData = { ...user, cart: removeProduct };
    //* put dữ liệu
    const putRemove = await putOneUser(removeData);
    if ((putRemove as any).status === 200) {
      toast.success(" sản phẩm đã được xóa khỏi giỏ hàng");
    }
    //* gọi dữ liệu lại
    const update = await getOneUser(getData.userID);
    //* updata data
    setUser(update);
  };

  //* ---------------------------------(tính tổng)----------------------------
  useEffect(() => {
    const totalAmount = CartProduct.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [CartProduct]);

  //* ------------------------------(shipments) ------------------------------
  let ship = 0;
  if (total >= 100000) {
    ship = 10000;
  } else {
    ship = 0;
  }

  // *----------------------------(onchance)-----------------------------------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (e.target.name === "district") {
      // Lấy giá trị name và value của option được chọn
      const selectedOption = e.target.options[e.target.selectedIndex].text;
      const ship = Number(e.target.value);

      setFormData({
        ...formData,
        district: selectedOption,
        ship: ship,
        [name]: value,
        // districtName: selectedName, // Lưu giá trị name của option
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //* ---------------------------(check out )----------------------------
  const handleCheckOut = async () => {
    const dataCheckOut = CartProduct.map((item: any) => ({
      id: user.id,
      nameProduct: item.name,
      quantity: item.quantity,
      images: item.images,
      category: item.category,
      idProduct: item.id,
      size: item.size,
      price: item.price,
      ship: ship,
      phone: formData.phone,
      address: formData.address,
      district: formData.district,
      status: true,
    }));

    const putData = await apiPutOrder(dataCheckOut);
    console.log(putData);
    setUser({ ...user, cart: [] });

    const updateUser = await putOneUser(user);
    setUser(updateUser);

    user.cart.forEach(async (item: any) => {
      const productId = item.id;
      const updatedProduct = {
        ...item,
        purchased: item.purchased + item.quantity,
        stock: item.stock - 1,
      };

      const container = await apiPostOrderProducts(productId, updatedProduct);
      console.log(container);
    });
  };

  return (
    <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
      <div className="px-4 py-6 mx-auto w-full lg:py-4 md:px-6">
        <div>
          <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
            Your Cart
          </h2>
          <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
            <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
              <div className="w-full px-4 mb-6 md:w-4/6 lg:w-4/12 md:mb-0">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Product name
                </h2>
              </div>
              <div className="hidden px-4 lg:block lg:w-2/12">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Price
                </h2>
              </div>
              <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Quantity
                </h2>
              </div>
              <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Subtotal
                </h2>
              </div>
              <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Remove
                </h2>
              </div>
            </div>
            <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
              {CartProduct?.map((item: any) => (
                <div
                  key={item.idProduct}
                  className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8"
                >
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-4/12 md:mb-0">
                    <div className="flex flex-wrap items-center -mx-4">
                      <div className="w-full px-4 mb-3 md:w-1/3">
                        <div className="  md:h-24 md:w-24">
                          <img
                            src={item.images[0].url}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="w-2/6 px-4">
                        <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                          {item.name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 ">
                          Size:{""} {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                      {/* {item?.price !== undefined && item?.item.toLocaleString()} */}
                      {item.price.toLocaleString()} VND
                    </p>
                    <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                      $1500
                    </span>
                  </div>
                  <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                    <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                      <button className="py-2 hover:text-gray-700 dark:text-gray-400">
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
                        value={item.quantity}
                      />
                      <button className="py-2 hover:text-gray-700 dark:text-gray-400">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                      {(item.price * item.quantity).toLocaleString()} vnd
                    </p>
                  </div>
                  <div className="w-auto px-4  md:w-1/6 lg:w-2/12 ">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400 ">
                      <FaRegTrashCan
                        className="float-right"
                        onClick={() => handldeDelete(item.idProduct)}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full px-4 mb-4 lg:w-1/2 ">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-gray-700 dark:text-gray-400">
                  Apply Coupon
                </span>
                <input
                  type="text"
                  className="w-full px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-400 dark:bg-gray-800"
                  placeholder="x304k45"
                />
                <button className="inline-block w-full px-8 py-4 font-bold text-center text-gray-100 bg-blue-500 rounded-md lg:w-32 hover:bg-blue-600">
                  Apply
                </button>
              </div>
              <div className="max-w-[500px] mx-auto p-6">
                <div className="mb-4 flex  items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4  flex  items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4 flex  items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="district"
                  >
                    Quận/Huyện
                  </label>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value={13000}>Hải Châu</option>
                    <option value={16000}>Thanh Khê</option>
                    <option value={20000}>Ngũ Hành Sơn</option>
                    <option value={15000}>Cẩm Lệ</option>
                    <option value={22000}>Liên Chiểu</option>
                    <option value={30000}>Hòa Vang</option>
                  </select>
                </div>
                <div className="flex items-center justify-between"></div>
              </div>
            </div>
            <div className="w-full px-4 mb-4 lg:w-1/2 ">
              <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                  Order Summary
                </h2>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                  <span className="text-gray-700 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                    {total.toLocaleString()} VND
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4 ">
                  <span className="text-gray-700 dark:text-gray-400 ">
                    Shipping
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                    {(formData.ship - ship).toLocaleString()} VND
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4 ">
                  <span className="text-gray-700 dark:text-gray-400">
                    Order Total
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                    {(total + ship).toLocaleString()} VND
                  </span>
                </div>
                <h2 className="text-lg text-gray-500 dark:text-gray-400">
                  We offer:
                </h2>
                <div className="flex items-center gap-2 mb-4 ">
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                </div>
                <div className="flex items-center justify-between ">
                  <button
                    className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={handleCheckOut}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CartPage;
