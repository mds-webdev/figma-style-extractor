import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/AppLayout.css";

const tools = [
    { path: "/figma", name: "Figma Companion", emoji: "🎨" },
    { path: "/live-editor", name: "Live Style Editor", emoji: "🎛️" },
    { path: "/brand-kit", name: "Brand Kit Generator", emoji: "📦" },
];

const AppLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2 className="logo">
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Gildner Developer Tools
                    </Link>
                </h2>
                <nav>
                    {tools.map((tool) => (
                        <Link
                            key={tool.path}
                            to={tool.path}
                            className={
                                location.pathname === tool.path ? "active" : ""
                            }
                        >
                            <span>{tool.emoji}</span> {tool.name}
                        </Link>
                    ))}
                </nav>
            </aside>
            <main className="content">{children}</main>
        </div>
    );
};

export default AppLayout;
