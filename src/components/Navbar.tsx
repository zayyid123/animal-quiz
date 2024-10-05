"use client";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { fbConfig } from "@/config/firebaseConfig";
import AlertCustom from "./AlertCustom";
import { useRouter } from "next/navigation";
import CookieManager from "@/utils/CookieManager";

type AlertProps = {
  message: string;
  type: "warning" | "danger" | "success";
};

const Navbar = () => {
  const auth = getAuth(fbConfig);
  const router = useRouter();
  const cookieManager = new CookieManager();
  const [userData, setuserData] = useState({
    email: "",
  });
  const [isOpenProfile, setisOpenProfile] = useState(false);
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [alertData, setalertData] = useState<AlertProps>({
    message: "",
    type: "success",
  });

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setalertData({
          message: "Success Log Out",
          type: "success",
        });
        cookieManager.eraseCookie("access_token");
        setisOpenAlert(true);
        setTimeout(() => {
          router.push("/sign-in");
        }, 1000);
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

  useEffect(() => {
    const getDataFromCookie = () => {
      const userDataFromCookie = JSON.parse(
        cookieManager.getCookie("access_token") as string
      );
      setuserData(userDataFromCookie);
    };

    getDataFromCookie();
  }, []);

  return (
    <div className="sticky top-0 w-full glass shadow-lg py-4 px-3 flex justify-between items-center">
      <p className="text-xl text-center font-bold leading-tight tracking-tight text-white drop-shadow md:text-2xl">
        Animal<span className="text-primary-600">Quizz</span>
      </p>

      <div>
        {/* user */}
        <div
          className="group flex justify-end items-center gap-x-2 cursor-pointer text-white"
          onClick={() => setisOpenProfile(!isOpenProfile)}
        >
          <div className="flex justify-center flex-col items-end">
            <p className="text-lg text-right text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] capitalize">
              User
            </p>
            <p className="text-xs text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]">{userData?.email}</p>
          </div>
          <div className="w-10 h-10 overflow-hidden rounded-full bg-primary-700 flex justify-center items-center">
            <Image
              src={"/pictures/animal/koala.png"}
              width={100}
              height={100}
              alt="profile"
              className="w-[40px] h-[40px] object-cover"
            />
          </div>
          <div>
            <ChevronDownIcon
              className={`w-5 h-5 ease-in-out duration-300 ${
                isOpenProfile && "rotate-180"
              }`}
            />
          </div>
        </div>

        {/* menu user */}
        <div
          className={`absolute shadow-lg bg-white border top-20 right-5 ${
            isOpenProfile
              ? "w-[190px] scale-100 opacity-100"
              : "w-0 scale-0 opacity-0"
          } ease-in-out duration-300 origin-top py-2 rounded-md text-primary-600`}
        >
          <div
            onClick={() => {
              handleLogOut();
            }}
            className="px-4 py-2 my-1 cursor-pointer flex items-center gap-x-2 group hover:bg-primary-600 ease-in-out duration-300"
          >
            <ArrowLeftStartOnRectangleIcon className="text-primary-600 group-hover:text-white ease-in-out duration-300 w-5 h-5" />
            <p className="text-label-lg text-primary-600 group-hover:text-white ease-in-out duration-300">
              Log Out
            </p>
          </div>
        </div>
      </div>

      {/* alert custom */}
      <AlertCustom
        isOpen={isOpenAlert}
        setisOpen={setisOpenAlert}
        alertText={alertData.message}
        type={alertData.type}
      />
    </div>
  );
};

export default Navbar;
