// src/api/figma.js
import axios from "axios";

const FIGMA_API_URL = "https://api.figma.com/v1";

const token = "figd_2oeAwGZ5iM3fw46xaYMruyRVAPIeKfTjb6VMKAFK";

if (!token) {
    console.warn("⚠️ No Figma API token found in env!");
}

const axiosInstance = axios.create({
    baseURL: FIGMA_API_URL,
    headers: {
        "X-Figma-Token": token || "invalid-token",
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
