"use client";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
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
  return (
    <div className="w-full bg-white shadow-lg py-4 px-3 flex justify-between items-center">
      <p className="text-xl text-center font-bold leading-tight tracking-tight text-gray-700 drop-shadow md:text-2xl">
        Animal<span className="text-primary-600">Quizz</span>
      </p>

      <div>
        {/* user */}
        <div
          className="group flex justify-end items-center gap-x-2 cursor-pointer text-gray-700"
          onClick={() => setisOpenProfile(!isOpenProfile)}
        >
          <div className="text-right">
            <p className="text-lg text-gray-600 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] capitalize">
              User
            </p>
            <p className="text-xs text-gray-500 capitalize">Pengunjung</p>
          </div>
          <Image
            src={"/pictures/animal/cat.png"}
            width={100}
            height={100}
            alt="profile"
            className="w-[20%] object-cover"
          />
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
