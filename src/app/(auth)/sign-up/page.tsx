"use client";
import ParticlesComponent from "@/components/ParticlesComponent";
import Link from "next/link";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fbConfig } from "@/config/firebaseConfig";
import AlertCustom from "@/components/AlertCustom";
import { useRouter } from "next/navigation";

const auth = getAuth(fbConfig);

type AuthData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AlertProps = {
  message: string;
  type: "warning" | "danger" | "success";
};

const SignUpPage = () => {
  const router = useRouter();
  const [dataSignUp, setdataSignUp] = useState<AuthData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [alertData, setalertData] = useState<AlertProps>({
    message: "",
    type: "success",
  });

  const handleChangeInput = (value: string, key: string) => {
    setdataSignUp({ ...dataSignUp, [key]: value });
  };

  const handleSignUpWithEmail = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // check is password and confirm password same
    if (password !== confirmPassword) {
      setalertData({
        message: "password and confirm passsword are not same",
        type: "danger",
      });
      setisOpenAlert(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        setalertData({
          message: "Success Sign Up",
          type: "success",
        });
        setisOpenAlert(true);
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setalertData({
          message: errorMessage,
          type: "danger",
        });
        setisOpenAlert(true);
      });
  };

  return (
    <section className="h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full glass rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white drop-shadow md:text-2xl">
              Animal<span className="text-primary-600">Quizz</span>
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUpWithEmail(
                  dataSignUp.email,
                  dataSignUp.password,
                  dataSignUp.confirmPassword
                );
              }}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  onChange={(e) => handleChangeInput(e.target.value, "email")}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) =>
                    handleChangeInput(e.target.value, "password")
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) =>
                    handleChangeInput(e.target.value, "confirmPassword")
                  }
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-white">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-white">
                Already have an account?{" "}
                <Link
                  href={"/sign-in"}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* particles */}
      <ParticlesComponent />

      {/* alert custom */}
      <AlertCustom
        isOpen={isOpenAlert}
        setisOpen={setisOpenAlert}
        alertText={alertData.message}
        type={alertData.type}
      />
    </section>
  );
};

export default SignUpPage;
