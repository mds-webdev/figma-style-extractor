import React, { useState, useEffect } from "react";
import { getFileData } from "../api/figma";
import { extractColors } from "../utils/extractTokens";
import { exportAsJSON, exportAsSCSS } from "../utils/exportTokens";
import { Form, Button, Alert } from "react-bootstrap";
import ColorSwatchGrid from "../components/ColorSwatchGrid";

const Home = () => {
    const [fileKey, setFileKey] = useState("");
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setError(null);
        setLoading(true);
        setOutput(null);
        try {
            const figmaToken = process.env.REACT_APP_FIGMA_API_KEY;
            if (!figmaToken) {
                throw new Error(
                    "Figma API key missing! Check your .env setup."
                );
            }

            const raw = await getFileData(fileKey, figmaToken);

            // Flatten nodes to simplify mapping
            const flattenNodes = (node, acc = {}) => {
                if (!node) return acc;
                acc[node.id] = node;
                if (node.children) {
                    node.children.forEach((child) => flattenNodes(child, acc));
                }
                return acc;
            };

            const nodes = flattenNodes(raw.document);
            const colorTokens = extractColors(raw.styles, nodes);
            setOutput(colorTokens);
            console.log("🧱 Flattened nodes:", nodes);
            console.log("🎨 Styles:", raw.styles);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1>🎨 Figma Style Extractor</h1>

            <Form>
                <Form.Group>
                    <Form.Label>Figma File Key</Form.Label>
                    <Form.Control
                        type="text"
                        value={fileKey}
                        onChange={(e) => setFileKey(e.target.value)}
                        placeholder="Enter your Figma file key"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    className="mt-3"
                    onClick={handleFetch}
                    disabled={loading}
                >
                    {loading ? "Fetching…" : "Extract Styles"}
                </Button>
            </Form>

            {error && (
                <Alert variant="danger" className="mt-4">
                    ⚠️ {error}
                </Alert>
            )}

            {output && (
                <>
                    <h4 className="mt-5">🎨 Extracted Color Tokens</h4>
                    <ColorSwatchGrid colors={output} />
                    <pre className="bg-light p-3 rounded mt-4">
                        {JSON.stringify(output, null, 2)}
                    </pre>
                </>
            )}
            <div className="d-flex gap-2 mt-4">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => exportAsJSON(output)}
                >
                    📄 Export as JSON
                </button>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => exportAsSCSS(output)}
                >
                    💅 Export as SCSS
                </button>
            </div>
        </div>
    );
};

export default Home;
