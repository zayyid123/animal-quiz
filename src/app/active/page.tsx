"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const ActivePage = () => {
  const [isOpenQuestion, setisOpenQuestion] = useState(false);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full min-h-screen pt-4">
      <div className="w-full h-full flex justify-center items-center flex-col gap-y-2">
        <div className="w-[96%] max-w-[1080px] mb-2 flex justify-between items-center gap-x-3">
          <div className="bg-slate-800 w-full h-16 rounded-lg">
            <div className="h-full w-[30%] bg-green-500 rounded-lg"></div>
          </div>
          <div className="bg-green-500 w-[70px] h-full p-5 rounded-lg text-center">
            1.00
          </div>
        </div>

        <div className="glass w-[96%] h-full mb-4 p-5 rounded-lg text-white max-w-[1080px]">
          <div className="bg-white rounded-lg text-slate-700 p-3">
            1. Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="flex flex-wrap justify-center mt-2 gap-2 h-full">
            {[1, 2, 3, 4].map((res, index) => (
              <div
                key={"hello" + index}
                className={`md:w-[49%] w-[48%] h-40 ${
                  index === 0 && "bg-[#3474B1] hover:bg-[#4192dd]"
                } ${index === 1 && "bg-[#3FA0A9] hover:bg-[#4dc1cc]"} ${
                  index === 2 && "bg-[#F0AC31] hover:bg-[#f0c575]"
                } ${
                  index === 3 && "bg-[#D65972] hover:bg-[#ee627e]"
                } text-center flex justify-center items-center p-3 rounded-lg ease-in-out duration-300 cursor-pointer`}
              >
                <p>{res}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sidebar */}
      <div
        className={`fixed top-0 ${
          isOpenQuestion ? "w-full" : "w-0"
        } h-screen flex items-center`}
      >
        <div
          className={`relative bg-white h-[90%] ${
            isOpenQuestion ? "w-[300px]" : "right-10 w-0"
          } rounded-r-lg shadow my-auto p-5`}
        >
          {/* question */}
          <div className="flex w-full h-full justify-between items-center gap-x-4 flex-wrap pr-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((res, index) => (
              <div
                key={"KotakQuestion" + index}
                className="bg-slate-500 text-center text-white w-[60px] h-[60px] flex justify-center items-center cursor-pointer hover:bg-slate-300 ease-in-out duration-300"
              >
                <div>{res}</div>
              </div>
            ))}
          </div>

          {/* btn */}
          <div
            onClick={() => {
              setisOpenQuestion(!isOpenQuestion);
            }}
            className={`absolute top-5 ${
              isOpenQuestion ? "-right-4" : "-right-10"
            } bg-slate-800 text-white w-10 text-center flex justify-center items-center py-2 cursor-pointer hover:bg-slate-600 ease-in-out duration-300`}
          >
            <ChevronRightIcon
              className={`w-5 h-5 ${isOpenQuestion && "rotate-180"}`}
            />
          </div>
        </div>

        {/* bg */}
        <div
          className={`w-full h-full bg-[#4e4e4e9c] absolute top-0 ${
            isOpenQuestion ? "right-0" : "right-[100%]"
          } -z-10 ease-in-out duration-300`}
        ></div>
      </div>
    </div>
  );
};

export default ActivePage;
