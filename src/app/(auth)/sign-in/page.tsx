"use client";
import ParticlesComponent from "@/components/ParticlesComponent";
import Link from "next/link";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fbConfig } from "@/config/firebaseConfig";
import AlertCustom from "@/components/AlertCustom";
import { useRouter } from "next/navigation";
import CookieManager from "@/utils/CookieManager";

const auth = getAuth(fbConfig);

type SignInData = {
  email: string;
  password: string;
};

type AlertProps = {
  message: string;
  type: "warning" | "danger" | "success";
};

const SignInPage = () => {
  const router = useRouter();
  const cookieManager = new CookieManager();
  const [dataSignIn, setdataSignIn] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [alertData, setalertData] = useState<AlertProps>({
    message: "",
    type: "success",
  });

  const handleChangeInput = (value: string, key: string) => {
    setdataSignIn({ ...dataSignIn, [key]: value });
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setalertData({
          message: "Success Sign In",
          type: "success",
        });
        setisOpenAlert(true);
        console.log(user)
        cookieManager.setCookie("access_token", user, 1);
        setTimeout(() => {
          router.push("/");
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
        <div className="w-full glass rounded-[20px] md:mt-0 sm:max-w-md xl:p-0 shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white drop-shadow md:text-2xl">
              Animal<span className="text-primary-600">Quizz</span>
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignInWithEmail(dataSignIn.email, dataSignIn.password);
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) =>
                    handleChangeInput(e.target.value, "password")
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white">
                Don’t have an account yet?{" "}
                <Link
                  href={"/sign-up"}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
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

export default SignInPage;
