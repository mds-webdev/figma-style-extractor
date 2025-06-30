import React, { useEffect, useState } from "react";

export default function WordPressWizard() {
    const [phpVersions, setPhpVersions] = useState([]);
    const [phpVersion, setPhpVersion] = useState("");
    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState(null);
    const [isLoadingVersions, setIsLoadingVersions] = useState(true);


   useEffect(() => {
       const loadPhpVersions = async () => {
           setIsLoadingVersions(true); // Start spinner

           try {
               const response = await fetch(
                   "http://localhost:5000/api/php-versions"
               );
               const rawVersions = await response.json();

               const versions = [...new Set(rawVersions)]
                   .sort((a, b) => parseFloat(b) - parseFloat(a))
                   .slice(0, 4);

               setPhpVersions(versions);
               setPhpVersion(versions[0] || "");
           } catch (err) {
               console.error("Failed to fetch PHP versions:", err);
               const fallback = ["8.4", "8.3", "8.2", "8.1"];
               setPhpVersions(fallback);
               setPhpVersion(fallback[0]);
           }

           setIsLoadingVersions(false); // Stop spinner
       };

       loadPhpVersions();
   }, []);

    const handleLaunch = () => {
        if (!domain) return;
        setStatus(
            `🚀 Launching WordPress site for "${domain}" with PHP ${phpVersion}...`
        );
        // Future: Call your backend to trigger Plesk + WordPress setup
    };

    return (
        <div style={{ maxWidth: 500 }}>
            <h2>⚡ WordPress Site Wizard</h2>
            <p>
                Automate WordPress + subdomain creation with selected PHP
                version.
            </p>

            <label className="form-label">🌐 Subdomain:</label>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="e.g. newsite"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
            />

            <label className="form-label">⚙️ PHP Version:</label>
            {isLoadingVersions ? (
                <div className="mb-3">⏳ Loading PHP versions...</div>
            ) : (
                <select
                    className="form-control mb-3"
                    value={phpVersion}
                    onChange={(e) => setPhpVersion(e.target.value)}
                >
                    {phpVersions.map((version) => (
                        <option key={version} value={version}>
                            {version}
                        </option>
                    ))}
                </select>
            )}

            <button
                className="btn btn-primary"
                onClick={handleLaunch}
                disabled={!domain || !phpVersion}
            >
                🏁 Launch Site
            </button>

            {status && (
                <div
                    className="alert alert-info mt-3"
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    {status}
                </div>
            )}
        </div>
    );
}
