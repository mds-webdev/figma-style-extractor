export const extractTokens = (styles, allNodes) => {
    const colors = {};
    const typography = {};

    Object.entries(styles).forEach(([styleId, style]) => {
        if (style.styleType === "FILL") {
            const node = Object.values(allNodes).find(
                (n) =>
                    n.styles?.fill === styleId &&
                    n.fills?.some((f) => f.type === "SOLID")
            );
            const paint = node?.fills?.find((f) => f.type === "SOLID");
            if (paint) {
                const { r, g, b } = paint.color;
                colors[style.name] = `rgb(${Math.round(r * 255)}, ${Math.round(
                    g * 255
                )}, ${Math.round(b * 255)})`;
            }
        }

        if (style.styleType === "TEXT") {
            const node = Object.values(allNodes).find(
                (n) => n.styles?.text === styleId && n.style
            );
            if (node?.style) {
                const {
                    fontFamily,
                    fontSize,
                    fontWeight,
                    lineHeightPx,
                    letterSpacing,
                } = node.style;
                typography[style.name] = {
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    fontWeight,
                    lineHeight: `${lineHeightPx}px`,
                    letterSpacing: `${letterSpacing}px`,
                };
            }
        }
    });

    return { colors, typography };
};
