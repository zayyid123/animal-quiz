"use client";
import AlertCustom from "@/components/AlertCustom";
import CardQuizHistory from "@/components/CardQuizHistory";
import Navbar from "@/components/Navbar";
import ParticlesComponent from "@/components/ParticlesComponent";
import { getAllQuiz, getAllQuizzes } from "@/services/quiz.service";
import CookieManager from "@/utils/CookieManager";
import getCurrentAndEndDate from "@/utils/getCurrentAndEndDate";
import LocalStorageManager from "@/utils/LocalStorageManager";
import shuffleArray from "@/utils/shuffleArray";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usePortal from "react-useportal";

type DataQuiz = {
  name: string;
  difficult: "easy" | "medium" | "hard";
};

type AlertProps = {
  message: string;
  type: "warning" | "danger" | "success";
};

type HistoryQuiz = {
  data: {
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
  id: string;
};

export default function Home() {
  const { Portal } = usePortal();
  const router = useRouter();
  const cookieManager = new CookieManager();
  const localStorageManager = new LocalStorageManager();
  const [isOpenStartQuiz, setisOpenStartQuiz] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [dataQuiz, setdataQuiz] = useState<DataQuiz>({
    name: "",
    difficult: "easy",
  });
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [alertData, setalertData] = useState<AlertProps>({
    message: "",
    type: "success",
  });
  const [historyQuiz, sethistoryQuiz] = useState<HistoryQuiz[] | undefined>();

  const handleChangeInput = (value: string, key: string) => {
    setdataQuiz({ ...dataQuiz, [key]: value });
  };

  const handleCreateQuiz = async (
    name: string,
    difficult: "easy" | "medium" | "hard"
  ) => {
    setisOpenStartQuiz(false);
    setisLoading(true);
    try {
      const response = await getAllQuiz(difficult);
      if (response.data.response_code !== 0) {
        setalertData({
          message: "Coba 10 menit lagi",
          type: "danger",
        });
        setisLoading(false);
        setisOpenAlert(true);
        return;
      }

      // manage Answer
      const finalAnswer: object[] = [];
      response.data.results.map(
        (res: {
          incorrect_answers: string[];
          correct_answer: string;
          question: string;
        }) => {
          // manage array
          const answer = res.incorrect_answers;
          answer.push(res.correct_answer);

          const shuffledAnswer = shuffleArray(answer);

          finalAnswer.push({
            question: res.question,
            answer: shuffledAnswer,
            correct_answer: res.correct_answer,
          });
        }
      );

      // get time
      const time = getCurrentAndEndDate();
      const { startDate, endDate } = time;

      // save to local storage
      localStorageManager.addToLocalStorage("quiz_active", {
        name,
        difficult,
        allAnswerAndQuestion: finalAnswer,
        startDate,
        endDate,
      });

      // start quiz
      router.push("/active?page=1");
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setalertData({
        message: JSON.stringify(message),
        type: "danger",
      });
      setisLoading(false);
      setisOpenAlert(true);
    }
  };

  useEffect(() => {
    const getAlluizFromDb = async () => {
      const cookieUser = cookieManager.getCookie("access_token") as string;
      const userId = JSON.parse(cookieUser).uid;
      const res = (await getAllQuizzes(userId)) as HistoryQuiz[];
      sethistoryQuiz(res);
    };

    getAlluizFromDb();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />

      {/* body */}
      <div className="flex justify-center items-center flex-col gap-y-4 mt-20">
        <button
          onClick={() => setisOpenStartQuiz(!isOpenStartQuiz)}
          className="w-[90%] max-w-[1080px] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Start New
        </button>

        <div className="w-[90%] max-w-[1080px] bg-white p-5 rounded-lg">
          <p className="text-center font-bold text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full bg-clip-text text-transparent mb-4">
            History Quiz
          </p>

          {/* card */}
          <div className="flex justify-start items-start gap-3">
            {historyQuiz &&
              historyQuiz.map((res, index) => (
                <CardQuizHistory
                  key={"QuizHistory" + index}
                  dataQuiz={res.data}
                  idQuiz={res.id}
                />
              ))}
          </div>
        </div>
      </div>

      {/* particles */}
      <ParticlesComponent />

      {/* pop up */}
      <>
        {isOpenStartQuiz && (
          <Portal>
            <div
              className={`${
                isOpenStartQuiz ? "flex" : "hidden"
              } absolute top-0 right-0 justify-center items-center bg-[#4d4d4d62] w-full h-screen`}
            >
              <div className="bg-white w-[90%] max-w-[1080px] px-3 py-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Create New Quiz</p>
                  <button
                    onClick={() => {
                      setisOpenStartQuiz(!isOpenStartQuiz);
                    }}
                  >
                    <XMarkIcon className="w-5 h-5 text-red-700 hover:text-slate-700 ease-in-out duration-300" />
                  </button>
                </div>

                {/* input */}
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateQuiz(dataQuiz.name, dataQuiz.difficult);
                    }}
                  >
                    <div className="my-2">
                      <label
                        htmlFor="name_data"
                        className="block mb-2 text-sm font-medium text-slate-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name_data"
                        id="name_data"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Please Input Name"
                        onChange={(e) =>
                          handleChangeInput(e.target.value, "name")
                        }
                        required
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor="difficult_data"
                        className="block mb-2 text-sm font-medium text-slate-600"
                      >
                        Difficult
                      </label>
                      <select
                        name="difficult_data"
                        id="difficult_data"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        onChange={(e) =>
                          handleChangeInput(e.target.value, "difficult")
                        }
                        required
                      >
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                      </select>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Start
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>

      {/* loading */}
      <>
        {isLoading && (
          <Portal>
            <div
              className={`${
                isLoading ? "flex" : "hidden"
              } absolute top-0 right-0 justify-center items-center bg-[#29292962] w-full h-screen`}
            >
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-primary-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
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

      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full w-full -z-20 relative -mt-24" />
    </div>
  );
}
