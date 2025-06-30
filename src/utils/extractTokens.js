export const extractAllColors = (allNodes) => {
    const colorTokens = {};
    let count = 1;

    Object.values(allNodes).forEach((node) => {
        if (!node.fills) return;

        const paint = node.fills.find((f) => f.type === "SOLID" && f.color);
        if (paint) {
            const { r, g, b } = paint.color;
            const rgb = `rgb(${Math.round(r * 255)}, ${Math.round(
                g * 255
            )}, ${Math.round(b * 255)})`;

            const name = node.name || `Color ${count++}`;
            colorTokens[name] = rgb;
        }
    });

    return colorTokens;
};
