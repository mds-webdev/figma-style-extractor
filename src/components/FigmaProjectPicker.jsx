import { useEffect, useState } from "react";

export default function FigmaProjectPicker({
    setSelectedProject,
    setFileKey,
    extractTokens,
    handleFetch, // ✅ this is the real extractor logic from Home.jsx
}) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);

    const handleProjectSelect = async (project) => {
        setSelectedProject(project);

        try {
            const res = await fetch(
                `http://localhost:5000/api/figma/project/${project.id}/files`
            );
            const data = await res.json();

            if (Array.isArray(data)) {
                setFiles(data);

                if (Array.isArray(data) && data.length > 0) {
                    const firstFileKey = data[0].key;
                    setFileKey(firstFileKey); // ⬅️ sets the key in your form
                    await navigator.clipboard.writeText(firstFileKey); // optional
                    handleFetch(); // ⬅️ triggers the full style extraction
                }
            } else {
                console.error("❌ Invalid file list:", data);
                setFiles([]);
            }
        } catch (err) {
            console.error("❌ Failed to fetch files:", err);
            setFiles([]);
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/figma/projects")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error("❌ Unexpected API response:", data);
                    setProjects([]);
                }
            })
            .catch((err) => {
                console.error("❌ Failed to fetch projects:", err);
                setProjects([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>🔄 Loading projects...</p>;

    return (
        <div>
            <h4>Select a Figma Project</h4>
            <div className="row row-cols-2 g-3">
                {projects.map((project) => (
                    <div className="col" key={project.id}>
                        <button
                            onClick={() => handleProjectSelect(project)}
                            className="btn btn-light w-100 text-start border shadow-sm"
                            style={{ padding: "1rem", borderRadius: "0.5rem" }}
                        >
                            <strong>📁 {project.name}</strong>
                            <br />
                            <small>ID: {project.id}</small>
                        </button>
                    </div>
                ))}
            </div>
            {Array.isArray(files) && files.length > 0 && (
                <>
                    <h5 className="mt-4">Files in Project</h5>
                    <ul>
                        {files.map((file) => (
                            <li key={file.key}>
                                <button
                                    className="btn btn-outline-success mb-2"
                                    onClick={() => {
                                        setFileKey?.(file.key);
                                        navigator.clipboard.writeText(file.key);
                                        handleFetch?.();
                                    }}
                                >
                                    🗂️ {file.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
