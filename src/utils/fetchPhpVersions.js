export const fetchLatestPhpVersions = async () => {
    const response = await fetch("https://www.php.net/downloads.php");
    const html = await response.text();

    const versionRegex = /PHP (\d+\.\d+)\.\d+/g;
    const matches = [...html.matchAll(versionRegex)];

    // Extract unique major.minor versions (e.g. 8.4, 8.3)
    const versions = [...new Set(matches.map((m) => m[1]))];

    return versions.slice(0, 4); // Return latest 4
};
