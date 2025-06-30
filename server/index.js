const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

const FIGMA_TOKEN = process.env.REACT_APP_FIGMA_API_KEY;
const FIGMA_TEAM_ID = process.env.FIGMA_TEAM_ID;

// ✅ GET /api/figma/projects — List all projects from your Figma team
app.get("/api/figma/projects", async (req, res) => {
    if (!FIGMA_TOKEN || !FIGMA_TEAM_ID) {
        return res
            .status(500)
            .json({ error: "Missing FIGMA_TOKEN or FIGMA_TEAM_ID in .env" });
    }

    try {
        const response = await fetch(
            `https://api.figma.com/v1/teams/${FIGMA_TEAM_ID}/projects`,
            {
                headers: { "X-Figma-Token": FIGMA_TOKEN },
            }
        );

        const data = await response.json();
        console.log("[Figma API response]", data);
        if (!data.projects)
            throw new Error("No projects returned from Figma API");

        res.json(data.projects);
    } catch (error) {
        console.error("❌ Failed to fetch Figma projects:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/figma/project/:projectId/files", async (req, res) => {
    const { projectId } = req.params;

    const response = await fetch(
        `https://api.figma.com/v1/projects/${projectId}/files`,
        {
            headers: { "X-Figma-Token": process.env.FIGMA_TOKEN },
        }
    );

    const data = await response.json();
    if (!data.files) return res.status(500).json({ error: "No files found" });

    res.json(data.files);
});

// 🔌 Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
