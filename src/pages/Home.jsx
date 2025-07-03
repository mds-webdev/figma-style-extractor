import { Link } from "react-router-dom";
import "../styles/Home.css";

const tools = [
    {
        name: "Figma Companion",
        path: "/figma",
        icon: "🎨",
        description:
            "Extract and export color & typography tokens from Figma files.",
    },
    {
        name: "Subdomain Creator",
        path: "/subdomain-creator",
        icon: "⚡",
        description:
            "Edit design tokens on the fly with live previews and exports.",
    },
    
];

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Gildner Developer Tools</h1>
            <p className="subtitle">
                A modular toolkit for design systems, style exports, and
                creative automation.
            </p>

            <div className="tool-grid">
                {tools.map((tool) => (
                    <Link key={tool.path} to={tool.path} className="tool-card">
                        <div className="tool-icon">{tool.icon}</div>
                        <div className="tool-name">{tool.name}</div>
                        <div className="tool-desc">{tool.description}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
