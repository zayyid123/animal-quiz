"use client";
import Navbar from "@/components/Navbar";
import ParticlesComponent from "@/components/ParticlesComponent";
import { getQuizDetail } from "@/services/quiz.service";
import CookieManager from "@/utils/CookieManager";
import React, { useEffect } from "react";

const ResultPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const cookieManager = new CookieManager();
  useEffect(() => {
    const getDetailQuizFromDb = async () => {
      const cookieUser = cookieManager.getCookie("access_token") as string;
      const userId = JSON.parse(cookieUser).uid;
      const res = await getQuizDetail(userId, decodeURIComponent(id));
      console.log(res);
    };

    getDetailQuizFromDb();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />

      {/* particles */}
      <ParticlesComponent />
    </div>
  );
};

export default ResultPage;
