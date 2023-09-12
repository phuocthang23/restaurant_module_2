import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import FormInput from "../components/FormInput";
import { User } from "../../../interface/interface";
import CallDataUser from "../components/CallData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage: React.FC = () => {
  const userData = CallDataUser();
  const navigate = useNavigate();

  const filterEmail = userData.map((item) => item.email);

  const [user, setUser] = useState<User>({
    id: Math.floor(Math.random() * (99 - 7 + 1)) + 7,
    name: "",
    email: "",
    password: "",
    Repassword: "",
    gender: "male",
    phone: "",
    address: "",
    role: "user",
    avatar: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    status: true,
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    Repassword: "",
    gender: "",
    phone: "",
    address: "",
    role: "",
    avatar: "",
  });

  const hanbleSudmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;

    const newErrors = {
      name: "",
      email: "",
      password: "",
      Repassword: "",
      gender: "",
      phone: "",
      address: "",
      role: "",
      avatar: "",
    };

    if (user.name.trim() === "") {
      newErrors.name = "Tên không được để trống";
    } else if (user.name.length < 3 || user.name.length > 20) {
      newErrors.name =
        "UserName phải từ 3 ký tự trở lên và từ 20 ký tự trở xuống";
    }

    if (user.email.trim() === "") {
      newErrors.email = "Email không được để trống";
    } else if (!regex.test(user.email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (filterEmail.find((item: string) => item === user.email)) {
      newErrors.email = "Email đã tồn tại";
    }

    if (user.password.trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (user.password !== user.Repassword) {
      newErrors.password = "Mật khẩu không trùng khớp";
      newErrors.Repassword = "Mật khẩu không trùng khớp";
    }

    if (user.Repassword.trim() === "") {
      newErrors.Repassword = "Nhập lại mật khẩu không được để trống";
    }

    if (!/^[0-9]*$/.test(user.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setError(newErrors);
    //* lấy các thành phần newErrors và check từng  key
    const noErrors = Object.values(newErrors).every(
      (errorMsg) => errorMsg === ""
    );

    //* nếu true thì thực hiện
    if (noErrors) {
      const newUser = { ...user, cart: [], discount: [] };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Repassword, ...newUserWithoutRepassword } = newUser;
      //* post
      const res = await axios.post(
        "http://localhost:3000/users",
        newUserWithoutRepassword
      );
      if (res.status === 201) {
        toast.success("đăng ký thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/auth");
        }, 2500);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-24 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <HeaderLogin heading="Create an account" />
            <form
              className="space-y-8 md:space-y-6"
              onSubmit={(e) => hanbleSudmit(e)}
            >
              <div>
                <FormInput
                  placeholder="UserName"
                  text="UserName"
                  type="text"
                  name="name"
                  value={user.name}
                  setUser={setUser}
                  error={error.name}
                />

                <FormInput
                  placeholder="Email"
                  text="Email"
                  type="email"
                  name="email"
                  value={user.email}
                  setUser={setUser}
                  error={error.email}
                />
                <FormInput
                  placeholder="••••••••"
                  text="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  setUser={setUser}
                  error={error.password}
                />
                <FormInput
                  placeholder="••••••••"
                  text="RePassword"
                  type="password"
                  name="Repassword"
                  value={user.Repassword}
                  setUser={setUser}
                  error={error.Repassword}
                />
                <FormInput
                  placeholder="Phone Number"
                  text="Phone Number"
                  type="tel"
                  name="phone"
                  value={user.phone}
                  setUser={setUser}
                  error={error.phone}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    // required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage;
