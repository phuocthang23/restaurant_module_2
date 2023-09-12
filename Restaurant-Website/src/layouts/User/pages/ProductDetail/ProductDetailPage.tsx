/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../../../interface/interface";
import { addTocart, getOneProducts, getOneUser } from "../../../../api";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Carousel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isCheck = localStorage.getItem("Auth");
  const [selectedSize, setSelectedSize] = useState(0);
  const [size, setSize] = useState("M");
  //* product
  const [product, setProduct] = useState<Product>();

  //*gọi lại api products
  useEffect(() => {
    const data = async () => {
      const response = await getOneProducts(id);
      setProduct(response);
    };
    data();
  }, []);

  // lấy id người dùng
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginData: any = localStorage.getItem("Auth");
  const getData = JSON.parse(loginData) || "";

  const [user, setUser] = useState<any>(getData);

  useEffect(() => {
    const data = async () => {
      const response = await getOneUser(getData.userID);
      setUser(response);
    };
    data();
  }, []);
  //^---------------------------------------------------------------------
  const handleAddToCart = async () => {
    const listCartProduct = user.cart.filter((p: any) => p.id === product?.id);
    // console.log("listCartProduct", listCartProduct);
    const newPrice =
      product?.price !== undefined ? product.price + selectedSize : undefined;
    if (listCartProduct.length === 0) {
      const productCopy = {
        ...product,
        idProduct:
          user.cart.length > 0
            ? (user.cart[user.cart.length - 1]?.idProduct || 0) + 1
            : 1,
        price: newPrice,
        priceSize: selectedSize,
        size: size,
        quantity: value,
      };
      delete productCopy.capacity;
      user.cart.push(productCopy);
    } else {
      const existingProductIndex = user.cart.findIndex(
        (item: any) => item.id === product?.id && item.size === size
      );

      if (existingProductIndex !== -1) {
        user.cart[existingProductIndex].quantity += value;
      } else {
        const productCopy = {
          ...product,
          idProduct:
            user.cart.length > 0
              ? (user.cart[user.cart.length - 1]?.idProduct || 0) + 1
              : 1,
          price: newPrice,
          priceSize: selectedSize,
          size: size,
          quantity: value,
        };
        // delete productCopy.capacity;
        user.cart.push(productCopy);
      }
    }

    const res = await addTocart(user);
    const get = await getOneUser(user);

    if ((res as any).status === 200) {
      toast.success(" sản phẩm đã thêm vào giỏ hàng");
    }
    console.log("res", res);
    console.log(get);
  };

  // ^ -------------------------------------------------------------------------------------
  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue(value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleSizeChange = (event: any) => {
    setSelectedSize(Number(event.target.value)); // Lấy giá trị được chọn từ select
    setSize(event.target.options[event.target.selectedIndex].text); // Lấy text của option được chọn
  };
  console.log(selectedSize);
  console.log("size ============>", size);

  //^----------------------------------------------------------------------------------------------

  //*format
  const formattedNumber =
    product?.price !== undefined &&
    ((product?.price + selectedSize) * value).toLocaleString();
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5   mx-auto flex flex-wrap">
          <Carousel className="w-96 h-96">
            <img
              src={`${
                product?.images !== undefined && product?.images[0]?.url
              }`}
              className="w-96 h-96"
            />
            <img
              src={`${
                product?.images !== undefined && product?.images[1]?.url
              }`}
              className="w-96 h-96"
            />
            <img
              src={`${
                product?.images !== undefined && product?.images[2]?.url
              }`}
              className="w-96 h-96"
            />
          </Carousel>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <BsFillStarFill className=" text-red-500" />
                <BsFillStarFill className=" text-red-500" />
                <BsFillStarFill className=" text-red-500" />
                <BsFillStarFill className=" text-red-500" />
                <BsStar className=" text-red-500" />
                <span className="text-gray-600 ml-3">4/5</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn
            </p>
            <p className="title-font font-medium text-4xl text-gray-900 py-4">
              {formattedNumber}VND
            </p>
            <h2 className="text-lg title-font text-black font-bold">
              Stock - {product?.stock}
            </h2>
            <div className=" mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex  items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                    value={selectedSize}
                    name={size}
                    onChange={handleSizeChange}
                  >
                    {product?.capacity !== undefined &&
                      product?.capacity.map((size) => (
                        <option key={size.id} value={size.price}>
                          {size.name}
                        </option>
                      ))}
                  </select>

                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <IoIosArrowDown className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div>
                {/* quantity */}
                <p className="my-3">Quantity</p>
                <div className=" w-1/3 border border-gray-600 rounded bg-gray-200">
                  <button
                    type="button"
                    className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleDecrement}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="Quantity"
                    value={value}
                    className="h-10 w-16 border-transparent text-center   [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex">
              {isCheck !== null ? (
                <button
                  className="flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={() => handleAddToCart()}
                >
                  Add To Cart
                </button>
              ) : (
                <p>
                  ban chua longin vui long{" "}
                  <Link className="hover:text-red-500 text-blue-600" to="/auth">
                    bam vao day de login
                  </Link>
                </p>
              )}
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ProductDetailPage;
