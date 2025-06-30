const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON POST bodies

const ROOT_DOMAIN = "gildner.dev"; // ⬅️ replace with your actual domain

app.post("/api/deploy", (req, res) => {
    const { domain, phpVersion } = req.body;

    if (!domain || !phpVersion) {
        return res.status(400).json({ error: "Missing domain or phpVersion" });
    }

    const subdomain = `${domain}.${ROOT_DOMAIN}`;

    // 🔒 Step 1: Check if subdomain exists
    const checkCommand = `plesk bin subdomain --info ${domain} -domain ${ROOT_DOMAIN}`;

    exec(checkCommand, (checkErr) => {
        if (!checkErr) {
            return res.status(400).json({
                error: `Subdomain "${subdomain}" already exists. Deployment cancelled.`,
            });
        }

        // ✅ Safe to create — Step 2: Build creation + WordPress install command
        const shellCommand = `
      plesk bin subdomain --create ${domain} -domain ${ROOT_DOMAIN} -php ${phpVersion} &&
      plesk bin site --update ${subdomain} -php ${phpVersion} &&
      plesk ext wp-toolkit --install ${subdomain}
    `;

        exec(shellCommand, (deployErr, stdout, stderr) => {
            if (deployErr) {
                console.error(`❌ Deployment error:\n${stderr}`);
                return res.status(500).json({
                    error: "Deployment failed",
                    details: stderr,
                });
            }

            console.log(`✅ WordPress site created: ${subdomain}`);
            res.json({
                success: true,
                message: `Deployment successful for ${subdomain}`,
                output: stdout,
            });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🔧 Backend running on http://localhost:${PORT}`);
});
