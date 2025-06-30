// src/utils/extractTokens.js
export const extractColors = (styles, nodes) => {
    const colorTokens = {};

    Object.entries(styles).forEach(([key, style]) => {
        if (style.style_type === "FILL") {
            const node = nodes[style.node_id];
            const paint = node?.fills?.[0];
            if (paint?.color) {
                const { r, g, b } = paint.color;
                const rgb = `rgb(${Math.round(r * 255)}, ${Math.round(
                    g * 255
                )}, ${Math.round(b * 255)})`;
                colorTokens[style.name] = rgb;
            }
        }
    });

    return colorTokens;
};
