import React from "react";
import "../styles/ColorSwatchGrid.css";

const ColorSwatchGrid = ({ colors }) => {
    if (!colors || Object.keys(colors).length === 0) return null;

    return (
        <div className="swatch-grid mt-4">
            {Object.entries(colors).map(([name, value]) => (
                <div key={name} className="swatch-item">
                    <div
                        className="swatch-circle"
                        style={{ backgroundColor: value }}
                    ></div>
                    <div className="swatch-label">
                        <strong>{name}</strong>
                        <br/>
                        <span>{value}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorSwatchGrid;
