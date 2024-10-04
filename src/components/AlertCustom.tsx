"use client";
import React, { useEffect } from "react";
import usePortal from "react-useportal";

type AlertProps = {
  alertText: string;
  type: "warning" | "danger" | "success";
  isOpen: boolean;
  setisOpen: (bool: boolean) => void;
};

const AlertCustom = ({
  alertText,
  type = "warning",
  isOpen,
  setisOpen,
}: AlertProps) => {
  const { Portal } = usePortal();
  const typeAlert = {
    danger: {
      textColor: "text-red-800",
      borderColor: "border-red-800",
      backgroundColor: "bg-red-50",
      buttonColor: {
        text: "text-red-500",
        focus: "focus:ring-red-400",
        hover: "hover:bg-red-200",
      },
    },
    success: {
      textColor: "text-green-800",
      borderColor: "border-green-800",
      backgroundColor: "bg-green-50",
      buttonColor: {
        text: "text-green-500",
        focus: "focus:ring-green-400",
        hover: "hover:bg-green-200",
      },
    },
    warning: {
      textColor: "text-yellow-800",
      borderColor: "border-yellow-800",
      backgroundColor: "bg-yellow-50",
      buttonColor: {
        text: "text-yellow-500",
        focus: "focus:ring-yellow-400",
        hover: "hover:bg-yellow-200",
      },
    },
  };

  useEffect(() => {
    if (isOpen === true) {
      const timer = setTimeout(() => {
        setisOpen(false);
      }, 3000);
      return () => clearTimeout(timer); // bersihkan timer ketika komponen unmount
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Portal>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } absolute bottom-10 right-6 items-center p-4 mb-4 border ${
              typeAlert[type].textColor
            } ${typeAlert[type].borderColor} rounded-lg ${
              typeAlert[type].backgroundColor
            } ${isOpen ? "alert-enter" : "alert-exit"}`}
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">{alertText}</div>
            <button
              type="button"
              className={`ms-auto -mx-1.5 -my-1.5 ${typeAlert[type].backgroundColor} ${typeAlert[type].buttonColor.text} rounded-lg focus:ring-2 ${typeAlert[type].buttonColor.focus} p-1.5 ${typeAlert[type].buttonColor.hover} inline-flex items-center justify-center h-8 w-8`}
              onClick={(e) => {
                e.preventDefault();
                setisOpen(false);
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </Portal>
      )}
    </>
  );
};

export default AlertCustom;
