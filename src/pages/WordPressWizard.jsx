import React, { useState, useEffect } from "react";


export default function WordPressWizard() {
    
    const [domain, setDomain] = useState("");
    const [phpVersions, setPhpVersions] = useState([]);
    const [phpVersion, setPhpVersion] = useState("");
    const [status, setStatus] = useState(null);
    

    useEffect(() => {
        // 🧠 Fetch from your backend API (avoid CORS!)
        const loadVersions = async () => {
            try {
                const response = await fetch("/api/php-versions");
                const versions = await response.json();
                setPhpVersions(versions);
                setPhpVersion(versions[0]); // Default to latest
            } catch (err) {
                console.error("Failed to load PHP versions:", err);
                setPhpVersions(["8.2", "8.1"]); // Fallback if API fails
                setPhpVersion("8.2");
            }
        };

        loadVersions();
    }, []);

    const handleLaunch = async () => {
        setStatus("Launching site...");
        try {
            // 🚧 Future: Call backend API to trigger Plesk automation
            console.log("Requested site creation for:", domain, phpVersion);
            setStatus(`Site creation triggered for ${domain}`);
        } catch (err) {
            setStatus("❌ Something went wrong.");
        }
    };

    return (
        <div style={{ maxWidth: 500 }}>
            <h2>🚀 Subdomain Creator</h2>
            <p>Automate site creation via Plesk + WordPress.</p>

            <label>🌐 Subdomain:</label>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="e.g. newclient"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
            />

            <label>⚙️ PHP Version:</label>
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

            <button className="btn btn-primary" onClick={handleLaunch}>
                🏁 Launch Site
            </button>

            {status && <div className="alert alert-info mt-3">{status}</div>}
        </div>
    );
}
