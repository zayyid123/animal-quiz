import { axiosInstance } from "@/config/axiosConfig";

export const getAllQuiz = async (difficulty: "easy" | "medium" | "hard") => {
    const response = axiosInstance.get(`?amount=10&category=27&difficulty=${difficulty}&type=multiple`);
    return response;
};