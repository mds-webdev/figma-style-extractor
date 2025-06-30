import fetch from "node-fetch"; // if using Node <18

export default async function handler(req, res) {
    const html = await fetch("https://www.php.net/downloads.php").then((r) =>
        r.text()
    );

    const versionRegex = /PHP (\d+\.\d+)\.\d+/g;
    const matches = [...html.matchAll(versionRegex)];
    const versions = [...new Set(matches.map((m) => m[1]))];

    res.json(versions.slice(0, 4));
}
