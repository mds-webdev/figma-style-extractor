const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());

let cachedVersions = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

app.get("/api/php-versions", async (req, res) => {
    const now = Date.now();

    if (cachedVersions && now - lastFetched < CACHE_DURATION) {
        return res.json(cachedVersions);
    }

    try {
        const response = await fetch("https://www.php.net/downloads.php");
        const html = await response.text();

        const versionRegex = /PHP (\d+\.\d+)\.\d+/g;
        const matches = [...html.matchAll(versionRegex)];
        const versions = [...new Set(matches.map((m) => m[1]))]
            .sort((a, b) => parseFloat(b) - parseFloat(a))
            .slice(0, 4);

        cachedVersions = versions;
        lastFetched = now;

        res.json(versions);
    } catch (err) {
        console.error("[PHP Version Fetch Error]", err.message);
        const fallback = [ "8.3", "8.2", "8.1"];
        res.json(fallback);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`);
});
