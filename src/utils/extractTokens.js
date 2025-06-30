export const extractColors = (styles, allNodes) => {
    const colorTokens = {};

    Object.entries(styles).forEach(([styleId, style]) => {
        if (style.styleType !== "FILL") return;

        // Try to find ANY node using this styleId
        const node = Object.values(allNodes).find(
            (n) =>
                n.styles?.fill === styleId &&
                n.fills?.some((f) => f.type === "SOLID")
        );

        const paint = node?.fills.find((f) => f.type === "SOLID" && f.color);
        if (!paint) {
            console.warn(`⚠️ No node found for style: ${style.name}`);
            return;
        }

        const { r, g, b } = paint.color;
        const rgb = `rgb(${Math.round(r * 255)}, ${Math.round(
            g * 255
        )}, ${Math.round(b * 255)})`;

        colorTokens[style.name] = rgb;
    });

    return colorTokens;
};
