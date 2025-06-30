export const exportAsJSON = (tokens) => {
    const data = JSON.stringify(tokens, null, 2);
    downloadFile(data, "tokens.json", "application/json");
};

export const exportAsSCSS = (tokens) => {
    let scss = "";
    for (const [name, value] of Object.entries(tokens)) {
        const varName = `$${name.toLowerCase().replace(/\s+/g, "-")}`;
        scss += `${varName}: ${value};\n`;
    }
    downloadFile(scss, "tokens.scss", "text/plain");
};

const downloadFile = (data, filename, type) => {
    const blob = new Blob([data], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
