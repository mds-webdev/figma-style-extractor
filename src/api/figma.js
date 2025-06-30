// src/api/figma.js
import axios from "axios";

const FIGMA_API_URL = "https://api.figma.com/v1";

const axiosInstance = axios.create({
    baseURL: FIGMA_API_URL,
    headers: {
        "X-Figma-Token": import.meta.env.VITE_FIGMA_API_KEY,
    },
});

export const getFileData = async (fileKey) => {
    try {
        const response = await axiosInstance.get(`/files/${fileKey}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch Figma data: ${error.message}`);
    }
};
