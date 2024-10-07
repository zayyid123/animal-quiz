import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

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

const CardQuizHistory = ({
  key,
  dataQuiz,
  idQuiz,
}: {
  key: string;
  dataQuiz: DataQuiz;
  idQuiz: string;
}) => {
  const router = useRouter();
  return (
    <div
      key={key}
      className="w-[200px] h-fit rounded-lg p-5 bg-[#fac1ff] cursor-pointer relative"
    >
      {/* head */}
      <div className="bg-gradient-to-r h-[100px] rounded-lg from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center hover:scale-105 ease-in-out duration-300">
        <div className="text-white font-bold text-xl capitalize">
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
    </div>
  );
};

export default CardQuizHistory;
