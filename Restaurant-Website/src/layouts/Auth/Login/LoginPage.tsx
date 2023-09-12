import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import CallDataUser from "../components/CallData";

const LoginPage: React.FC = () => {
  const userData = CallDataUser(); //* gọi lại json
  const navigate = useNavigate();

  const filterEmail = userData?.map((item) => item.email);
  const filterPassword = userData?.map((item) => item.password);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;

    const newErrors = {
      email: "",
      password: "",
    };

    if (user.email.trim() === "") {
      newErrors.email = "Email không được để trống";
    } else if (!regex.test(user.email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (!filterEmail?.find((item: string) => item === user.email)) {
      newErrors.email = "Email không  tồn tại";
    }

    if (user.password.trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (
      !filterPassword?.find((item: string) => item === user.password)
    ) {
      newErrors.password = "Mật khẩu không đúng";
    }

    if (newErrors.email === "" && newErrors.password === "") {
      // Validation passed, save user ID to local storage
      const findUser = userData.find((item) => item.email === user.email);

      if (findUser) {
        const Auth = {
          userID: findUser.id,
        };

        localStorage.setItem("Auth", JSON.stringify(Auth));

        if (findUser.role === "Admin" && findUser.status === true) {
          navigate("/admin");
        } else if (findUser.role !== "Admin" && findUser.status === true) {
          navigate("/");
        }
      }
    }

    setError(newErrors);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            TFOODY
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <HeaderLogin heading=" Sign in to your account" />
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <FormInput
                    placeholder="name@company.com"
                    text=" Your email"
                    type="email"
                    name="email"
                    value={user.email}
                    setUser={setUser}
                    error={error.email}
                  />
                </div>
                <div>
                  <FormInput
                    placeholder="••••••••"
                    text=" Your Password"
                    type="password"
                    name="password"
                    value={user.password}
                    setUser={setUser}
                    error={error.password}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-yellow-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/auth/"
                    className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
