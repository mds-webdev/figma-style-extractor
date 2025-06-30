const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const FIGMA_TOKEN = process.env.FIGMA_API_KEY;
const FIGMA_TEAM_ID = process.env.FIGMA_TEAM_ID;

if (!FIGMA_TOKEN) {
    console.error("❌ Missing FIGMA_API_KEY in .env");
    process.exit(1);
}

// ✅ Route: Get all projects for a Figma team
app.get("/api/figma/projects", async (req, res) => {
    if (!FIGMA_TEAM_ID) {
        return res.status(500).json({ error: "Missing FIGMA_TEAM_ID in .env" });
    }

    try {
        const response = await fetch(
            `https://api.figma.com/v1/teams/${FIGMA_TEAM_ID}/projects`,
            {
                headers: { "X-Figma-Token": FIGMA_TOKEN },
            }
        );

        const data = await response.json();
        console.log("[Figma API projects]", data);

        if (!data.projects) {
            throw new Error(data.err || "No projects found");
        }

        res.json(data.projects);
    } catch (error) {
        console.error("❌ Failed to fetch projects:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route: Get all files in a project (or fallback to team files if preferred)
app.get("/api/figma/project/:projectId/files", async (req, res) => {
    const { projectId } = req.params;

    try {
        const response = await fetch(
            `https://api.figma.com/v1/projects/${projectId}/files`,
            {
                headers: { "X-Figma-Token": FIGMA_TOKEN },
            }
        );

        const data = await response.json();
        console.log("[Figma API file list]", data);

        if (!data.files) {
            throw new Error(data.err || "No files found or access denied");
        }

        const fileKeys = data.files.map((file) => ({
            key: file.key,
            name: file.name,
        }));

        res.json(fileKeys); // ✅ Return just the keys and names
    } catch (error) {
        console.error("❌ Failed to fetch Figma files:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Optional fallback route using team ID instead of project ID
app.get("/api/figma/team/files", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.figma.com/v1/teams/${FIGMA_TEAM_ID}/files`,
            {
                headers: { "X-Figma-Token": FIGMA_TOKEN },
            }
        );

        const data = await response.json();
        console.log("[Figma API team files]", data);

        if (!data.files) {
            throw new Error(data.err || "No files found for team");
        }

        res.json(data.files);
    } catch (error) {
        console.error("❌ Failed to fetch team files:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
