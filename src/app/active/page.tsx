"use client";
import AlertCustom from "@/components/AlertCustom";
import LocalStorageManager from "@/utils/LocalStorageManager";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { fbConfig } from "@/config/firebaseConfig";
import CookieManager from "@/utils/CookieManager";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(fbConfig);

type AlertProps = {
  message: string;
  type: "warning" | "danger" | "success";
};

type ActiveQuestion = {
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

const ActivePage = ({ searchParams }: { searchParams: { page: string } }) => {
  const router = useRouter();
  const localStorageManager = new LocalStorageManager();
  const cookieManager = new CookieManager();
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion | null>(
    null
  );
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState<AlertProps>({
    message: "",
    type: "success",
  });
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [percentageLeft, setPercentageLeft] = useState<number>(100);

  const selectAnswer = (page: number, value: string) => {
    const newArray: object[] = JSON.parse(
      JSON.stringify(
        localStorageManager.getFromLocalStorage("quiz_active")
          .allAnswerAndQuestion
      )
    );
    newArray[page] = { ...newArray[page], userAnswer: value };
    localStorageManager.editLocalStorage("quiz_active", {
      allAnswerAndQuestion: newArray,
    });
    const quizActive = localStorageManager.getFromLocalStorage("quiz_active");
    setActiveQuestion(quizActive);

    if (page + 2 === 11) {
      router.push(`/active?page=final`);
    } else {
      router.push(`/active?page=${page + 2}`);
    }
  };

  const handleSaveToDB = async () => {
    if (activeQuestion) {
      const cookieUser = cookieManager.getCookie("access_token") as string;
      const quizId =
        activeQuestion.name.split(" ").join("_") +
        "_" +
        activeQuestion.startDate.split(" ").join("_");
      const userId = JSON.parse(cookieUser).uid;

      // Referensi dokumen: quiz/userId/quizId
      const quizRef = doc(db, "quiz", userId, "userQuiz", quizId);

      // Menyimpan data kuis ke dalam Firestore
      await setDoc(
        quizRef,
        localStorageManager.getFromLocalStorage("quiz_active")
      );

      localStorageManager.removeFromLocalStorage("quiz_active");
    }
  };

  // Get active question
  useEffect(() => {
    const getActiveQuestion = () => {
      const quizActive = localStorageManager.getFromLocalStorage("quiz_active");
      if (quizActive) {
        setActiveQuestion(quizActive);
      } else {
        setAlertData({
          message: "Tolong buat quis baru",
          type: "danger",
        });
        setIsOpenAlert(true);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    };

    getActiveQuestion();
  }, []);

  useEffect(() => {
    if (!activeQuestion?.endDate) return;

    const countdown = async () => {
      const end = new Date(activeQuestion?.endDate).getTime();
      const now = new Date().getTime();
      const timeLeft = end - now;

      if (timeLeft <= 0) {
        setTimeLeft("00:00");
        setAlertData({
          message: "Maaf Waktu Anda Habis",
          type: "danger",
        });
        setIsOpenAlert(true);
        router.push("/active?page=final");
        return
      }

      const minutes = Math.floor(timeLeft / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes}:${seconds}`);

      const percentage = (timeLeft / (10 * 60 * 1000)) * 100;
      setPercentageLeft(100 - Math.max(percentage, 0));
    };

    countdown();
    const timerInterval = setInterval(countdown, 1000);

    return () => clearInterval(timerInterval);
  }, [activeQuestion?.endDate]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full min-h-screen pt-4">
      <div className="w-full h-full flex justify-center items-center flex-col gap-y-2">
        <div className="w-[96%] max-w-[1080px] mb-2 flex justify-between items-center gap-x-3">
          <div className="bg-slate-800 w-full h-16 rounded-lg">
            <div
              className={`h-full bg-green-500 rounded-lg`}
              style={{
                width: `${percentageLeft}%`,
                backgroundColor: `${
                  percentageLeft >= 70 && percentageLeft <= 80
                    ? "#ffe347"
                    : percentageLeft > 80
                    ? "#ff4747"
                    : "#22c55e"
                }`,
              }}
            ></div>
          </div>
          <div
            className="bg-green-500 w-[70px] h-full p-5 rounded-lg text-center text-white font-bold flex justify-center items-center"
            style={{
              backgroundColor: `${
                percentageLeft >= 70 && percentageLeft <= 80
                  ? "#ffe347"
                  : percentageLeft > 80
                  ? "#ff4747"
                  : "#22c55e"
              }`,
            }}
          >
            <p>{timeLeft}</p>
          </div>
        </div>

        <div
          key={JSON.stringify(activeQuestion)}
          className="glass w-[96%] h-full mb-4 p-5 rounded-lg text-white max-w-[1080px]"
        >
          {activeQuestion && searchParams.page ? (
            <>
              {searchParams.page !== "final" ? (
                <>
                  <div className="bg-white rounded-lg text-slate-700 p-3">
                    {
                      activeQuestion.allAnswerAndQuestion[
                        parseInt(searchParams.page) - 1
                      ].question
                    }
                  </div>
                  <div className="flex flex-wrap justify-center mt-2 gap-2 h-full">
                    {activeQuestion.allAnswerAndQuestion[
                      parseInt(searchParams.page) - 1
                    ].answer.map((res, index) => (
                      <div
                        key={"answer" + index}
                        className={`md:w-[49%] w-[48%] h-40 ${
                          activeQuestion.allAnswerAndQuestion[
                            parseInt(searchParams.page) - 1
                          ]?.userAnswer === res
                            ? "bg-blue-500 hover:bg-blue-300"
                            : "bg-slate-700 hover:bg-slate-500"
                        } text-center flex justify-center items-center p-3 rounded-lg ease-in-out duration-100 cursor-pointer`}
                        onClick={() => {
                          selectAnswer(parseInt(searchParams.page) - 1, res);
                        }}
                      >
                        <p>{res}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p>Apakah anda ingin mengakhiri Quis</p>
                  <button
                    onClick={async () => {
                      await handleSaveToDB();
                      router.push(
                        `/result/${
                          activeQuestion.name.split(" ").join("_") +
                          "_" +
                          activeQuestion.startDate.split(" ").join("_")
                        }`
                      );
                    }}
                    className="mt-4 w-fit text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">Loading question...</div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          isOpenQuestion ? "w-full" : "w-0"
        } h-screen flex items-center`}
      >
        <div
          className={`relative bg-white h-[90%] w-[300px] ${
            isOpenQuestion ? "right-0" : "right-[300px]"
          } rounded-r-lg shadow my-auto p-5 ease-in-out duration-100`}
        >
          {/* Question List */}
          <div className="flex h-full justify-between items-center gap-x-4 flex-wrap pr-10 w-[270px]">
            {activeQuestion && searchParams.page && (
              <>
                {activeQuestion.allAnswerAndQuestion.map((res, index) => (
                  <div
                    key={"KotakQuestion" + index}
                    className={`${
                      res.userAnswer
                        ? "bg-blue-500 hover:bg-blue-300"
                        : "bg-slate-700 hover:bg-slate-500"
                    } text-center text-white w-[60px] h-[60px] flex justify-center items-center cursor-pointer ease-in-out duration-100`}
                    onClick={() => {
                      router.push(`/active?page=${index + 1}`);
                    }}
                  >
                    <div>{index + 1}</div>
                  </div>
                ))}
              </>
            )}
            <div
              className="bg-orange-500 h-[60px] w-[120px] flex flex-1 justify-center items-center cursor-pointer hover:bg-orange-300 ease-in-out duration-300"
              onClick={() => {
                router.push("/active?page=final");
              }}
            >
              <div>Final</div>
            </div>
          </div>

          {/* Toggle Button */}
          <div
            onClick={() => setIsOpenQuestion(!isOpenQuestion)}
            className={`absolute top-5 ${
              isOpenQuestion ? "-right-4" : "-right-10"
            } bg-slate-800 text-white w-10 text-center flex justify-center items-center py-2 cursor-pointer hover:bg-slate-600 ease-in-out duration-100`}
          >
            <ChevronRightIcon
              className={`w-5 h-5 ${isOpenQuestion && "rotate-180"}`}
            />
          </div>
        </div>

        {/* Background */}
        <div
          className={`w-full h-full bg-[#4e4e4e9c] absolute top-0 ${
            isOpenQuestion ? "right-0" : "right-[100%]"
          } -z-10 ease-in-out duration-100`}
        ></div>
      </div>

      {/* Alert Custom */}
      <AlertCustom
        isOpen={isOpenAlert}
        setisOpen={setIsOpenAlert}
        alertText={alertData.message}
        type={alertData.type}
      />
    </div>
  );
};

export default ActivePage;
