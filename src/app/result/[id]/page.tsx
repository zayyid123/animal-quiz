"use client";
import Navbar from "@/components/Navbar";
import ParticlesComponent from "@/components/ParticlesComponent";
import { getQuizDetail } from "@/services/quiz.service";
import calculateScore from "@/utils/calculateScore";
import CookieManager from "@/utils/CookieManager";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type AnswerQuestion = {
  userAnswer?: string;
  answer: string[];
  question: string;
  correct_answer?: string;
};

type Quiz = {
  difficult: string;
  allAnswerAndQuestion: AnswerQuestion[];
  endDate: string;
  startDate: string;
  name: string;
};

type AllScore = { correct: number; incorrect: number; totalScore: number };

const ResultPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const cookieManager = new CookieManager();
  const [allScore, setallScore] = useState<AllScore | undefined>();
  const [allDatauiz, setallDatauiz] = useState<Quiz | undefined>();

  useEffect(() => {
    const getDetailQuizFromDb = async () => {
      const cookieUser = cookieManager.getCookie("access_token") as string;
      const userId = JSON.parse(cookieUser).uid;
      const res = (await getQuizDetail(userId, decodeURIComponent(id))) as Quiz;
      setallScore(calculateScore(res));
      setallDatauiz(res);
    };

    getDetailQuizFromDb();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />

      {/* body */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%] max-w-[1080px] bg-white mt-10 p-5 rounded-lg">
          {allDatauiz && (
            <>
              <h1 className="text-center capitalize font-bold lg:text-7xl text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full bg-clip-text text-transparent">
                {allDatauiz.name}
              </h1>

              <h2 className="text-center capitalize">
                <span className="font-bold">Start: </span>{allDatauiz.startDate}
              </h2>

              <h2 className="text-center capitalize">
                <span className="font-bold">End: </span>{allDatauiz.endDate}
              </h2>

              <h2 className="text-center capitalize">
                {allDatauiz.difficult}
              </h2>
            </>
          )}

          {allScore && (
            <div className="mt-5">
              <div className="flex justify-center items-start gap-x-4">
                <div className="flex justify-center items-center flex-col text-center">
                  <p className="font-bold text-xl">Benar:</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {allScore.correct}
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col text-center">
                  <p className="font-bold text-xl">Salah:</p>
                  <p className="text-3xl font-bold text-red-600">
                    {allScore.incorrect}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col text-center mt-4">
                <p className="font-bold text-xl">Total Score:</p>
                <p className="text-6xl font-bold text-green-600">
                  {allScore.totalScore}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              router.push(`/`);
            }}
            className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Back Homepage
          </button>
        </div>
      </div>

      {/* particles */}
      <ParticlesComponent />
    </div>
  );
};

export default ResultPage;
