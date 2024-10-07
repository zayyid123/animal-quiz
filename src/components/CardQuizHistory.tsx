"use client";
import { deleteQuiz } from "@/services/quiz.service";
import CookieManager from "@/utils/CookieManager";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import usePortal from "react-useportal";
import AlertCustom from "./AlertCustom";

type DataQuiz = {
  allAnswerAndQuestion: {
    question: string;
    answer: string[]; // Define answer type explicitly
    correct_answer: string;
    userAnswer: string | undefined;
  }[];
  difficult: "easy" | "medium" | "hard";
  endDate: string;
  startDate: string;
  name: string;
};

type AlertProps = {
  message: string;
  type: "warning" | "danger" | "success";
};

const CardQuizHistory = ({
  key,
  dataQuiz,
  idQuiz,
  setisLoading,
}: {
  key: string;
  dataQuiz: DataQuiz;
  idQuiz: string;
  setisLoading: (bool: boolean) => void;
}) => {
  const router = useRouter();
  const { Portal } = usePortal();
  const cookieManager = new CookieManager();
  const [isOpenPopUpRemovQuiz, setisOpenPopUpRemovQuiz] =
    useState<boolean>(false);
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [alertData, setalertData] = useState<AlertProps>({
    message: "",
    type: "success",
  });

  return (
    <div
      key={key}
      className="md:w-[250px] w-full h-fit rounded-lg p-5 bg-[#fac1ff] cursor-pointer relative"
    >
      {/* head */}
      <div className="bg-gradient-to-r h-[100px] rounded-lg from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center hover:scale-105 ease-in-out duration-300">
        <div className="text-white font-bold text-xl capitalize whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
          {dataQuiz.name}
        </div>
      </div>

      {/* body */}
      <div className="flex justify-start items-center gap-x-2 mt-3 text-gray-800 capitalize">
        <p className="font-bold">difficult: </p>
        <p className="text-blue-700">{dataQuiz.difficult}</p>
      </div>

      <div className="flex justify-start items-center gap-x-2 mt-3 text-gray-800 capitalize">
        <p className="font-bold">Start: </p>
        <p className="text-blue-700">{dataQuiz.startDate}</p>
      </div>

      <div className="flex justify-start items-center gap-x-2 mt-3 text-gray-800 capitalize">
        <p className="font-bold">End: </p>
        <p className="text-blue-700">{dataQuiz.endDate}</p>
      </div>

      {/* button remove */}
      <div
        className="absolute top-0 right-0 bg-red-400 pb-2 pt-1 pl-2 group"
        style={{ borderRadius: "0 8px 0 50px" }}
        onClick={() => {
          setisOpenPopUpRemovQuiz(true);
        }}
      >
        <TrashIcon className="w-5 h-5 text-white group-hover:scale-110 ease-in-out duration-300" />
      </div>

      {/* button detail */}
      <button
        onClick={() => {
          router.push(`/result/${idQuiz}`);
        }}
        className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Detail
      </button>

      {/* pop up removw qquiz */}
      <>
        {isOpenPopUpRemovQuiz && (
          <Portal>
            <div
              className={`${
                isOpenPopUpRemovQuiz ? "flex" : "hidden"
              } absolute top-0 right-0 justify-center items-center bg-[#4d4d4d62] w-full h-screen`}
            >
              <div className="bg-white w-[90%] max-w-[1080px] px-3 py-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold"></p>
                  <button
                    onClick={() => {
                      setisOpenPopUpRemovQuiz(!isOpenPopUpRemovQuiz);
                    }}
                  >
                    <XMarkIcon className="w-5 h-5 text-red-700 hover:text-slate-700 ease-in-out duration-300" />
                  </button>
                </div>

                <div className="text-center font-bold text-xl">
                  Anda Yakin Ingin Menghapus Quiz ini ?
                </div>

                <div className="mt-3 flex justify-between items-center gap-x-4">
                  <button
                    onClick={async () => {
                      const cookieUser = cookieManager.getCookie(
                        "access_token"
                      ) as string;
                      const userId = JSON.parse(cookieUser).uid;
                      setisOpenPopUpRemovQuiz(false);
                      setisLoading(true);
                      await deleteQuiz(userId, idQuiz)
                        .then(() => {
                          setisLoading(false);
                          window.location.reload();
                        })
                        .catch((error) => {
                          let message = "Unknown Error";
                          if (error instanceof Error) message = error.message;
                          setalertData({
                            message: JSON.stringify(message),
                            type: "danger",
                          });
                          setisLoading(false);
                          setisOpenAlert(true);
                        });
                    }}
                    className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ya, Hapus
                  </button>

                  <button
                    onClick={() => {
                      setisOpenPopUpRemovQuiz(!isOpenPopUpRemovQuiz);
                    }}
                    className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>

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

export default CardQuizHistory;
