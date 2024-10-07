import { axiosInstance } from "@/config/axiosConfig";
import { fbConfig } from "@/config/firebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

// Inisialisasi Firestore
const db = getFirestore(fbConfig);

export const getAllQuiz = async (difficulty: "easy" | "medium" | "hard") => {
    const response = axiosInstance.get(`?amount=10&category=27&difficulty=${difficulty}&type=multiple`);
    return response;
};

export const getQuizDetail = async (userId: string, quizId: string) => {
    try {
        // Referensi dokumen: quiz/userId/userQuiz/quizId
        const quizRef = doc(db, 'quiz', userId, 'userQuiz', quizId);

        // Mengambil dokumen
        const quizSnapshot = await getDoc(quizRef);

        if (quizSnapshot.exists()) {
            // Menampilkan data kuis
            return quizSnapshot.data();
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error mengambil detail kuis: ", e);
    }
};

export const getAllQuizzes = async (userId: string) => {
    try {
        // Referensi koleksi: quiz/userId/userQuiz
        const quizzesRef = collection(db, 'quiz', userId, 'userQuiz');

        // Mengambil semua dokumen kuis
        const querySnapshot = await getDocs(quizzesRef);

        const quizzes: object[] = [];
        querySnapshot.forEach((doc) => {
            quizzes.push({
                id: doc.id,  // Menyimpan quizId
                data: doc.data()  // Menyimpan data kuis
            });
        });

        return quizzes;
    } catch (e) {
        console.error("Error mengambil semua kuis: ", e);
    }
};

export const deleteQuiz = async (userId: string, quizId: string) => {
    try {
        // Referensi dokumen: quiz/userId/userQuiz/quizId
        const quizRef = doc(db, 'quiz', userId, 'userQuiz', quizId);

        // Menghapus dokumen
        await deleteDoc(quizRef);

        console.log(`Quiz dengan ID ${quizId} berhasil dihapus.`);
    } catch (e) {
        console.error("Error menghapus kuis: ", e);
    }
};