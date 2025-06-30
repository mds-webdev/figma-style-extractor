import { useEffect, useState } from "react";

export default function FigmaProjectPicker({
    setSelectedProject,
    extractTokens,
}) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [files, setFiles] = useState([]);

    const handleProjectSelect = async (project) => {
        setSelectedProject(project);

        const res = await fetch(
            `http://localhost:5000/api/figma/project/${project.id}/files`
        );
        const fileData = await res.json();
        setFiles(fileData);
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/figma/projects")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error("❌ Unexpected API response:", data);
                    setProjects([]); // Fallback to empty array
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
            <ul>
                {files.map((file) => (
                    <li key={file.key}>
                        <button
                            className="btn btn-outline-success mb-2"
                            onClick={() => {
                                console.log("📄 Selected file:", file.name);
                                extractTokens(file.key);
                                navigator.clipboard.writeText(file.key);
                            }}
                        >
                            🗂️ {file.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
