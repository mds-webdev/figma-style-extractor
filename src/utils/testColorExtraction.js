import { extractColors } from "./extractTokens";

// Mock Figma API response sample
const mockStyles = {
    "1:2": {
        name: "Primary Blue",
        node_id: "2:45",
        style_type: "FILL",
    },
};

const mockNodes = {
    "2:45": {
        fills: [
            {
                color: { r: 0.2, g: 0.5, b: 0.9 },
                type: "SOLID",
            },
        ],
    },
};

const colors = extractColors(mockStyles, mockNodes);
console.log(colors);
