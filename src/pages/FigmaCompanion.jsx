import React, { useState } from 'react';
import { getFileData } from '../api/figma';
import { extractTokens } from '../utils/extractTokens';
import { exportAsJSON, exportAsSCSS } from '../utils/exportTokens';
import ColorSwatchGrid from '../components/ColorSwatchGrid';
import FigmaProjectPicker from "../components/FigmaProjectPicker";
import '../styles/Home.css';

const Home = () => {
  const [fileKey, setFileKey] = useState('');
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const flattenNodes = (node, acc = {}) => {
    if (!node) return acc;
    acc[node.id] = node;
    if (node.children) {
      node.children.forEach((child) => flattenNodes(child, acc));
    }
    return acc;
  };

  const handleFetch = async () => {
    setError(null);
    setLoading(true);
    setOutput(null);

    try {
      const figmaToken = process.env.REACT_APP_FIGMA_API_KEY;
      if (!figmaToken) throw new Error('Missing Figma API key. Check .env setup.');

      const raw = await getFileData(fileKey, figmaToken);
      const nodes = flattenNodes(raw.document);
      const tokens = extractTokens(raw.styles, nodes);
      setOutput(tokens);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container my-5">
          <h1 className="mb-4">🎨 Figma Token Extractor</h1>
          {/* 🔍 Project Picker */}
          <FigmaProjectPicker
              setSelectedProject={setSelectedProject}
              setFileKey={setFileKey}
              extractTokens={extractTokens} // optionally keep this for file-only clicks
              handleFetch={handleFetch}
          />

         
          <h4 className="my-4">OR enter Figma File Key</h4>
          <div className="form-group mb-3">
              <label className='mb-2'>Figma File Key</label>
              <input
                  className="form-control"
                  type="text"
                  placeholder="Paste your Figma file key here"
                  value={fileKey}
                  onChange={(e) => setFileKey(e.target.value)}
              />
          </div>

          <button
              className="btn btn-primary"
              onClick={handleFetch}
              disabled={loading || !fileKey}
          >
              {loading ? "Extracting..." : "Extract Tokens"}
          </button>

          {error && <div className="alert alert-danger mt-4">⚠️ {error}</div>}

          {output && (
              <>
                  {/* Color swatches */}
                  {output.colors && (
                      <>
                          <h4 className="mt-5">🎨 Color Tokens</h4>
                          <ColorSwatchGrid colors={output.colors} />
                      </>
                  )}

                  {/* Typography tokens */}
                  {output.typography && (
                      <>
                          <h4 className="mt-5">🔤 Typography Tokens</h4>
                          <div className="typography-preview">
                              {Object.entries(output.typography).map(
                                  ([name, style]) => (
                                      <div
                                          key={name}
                                          className="typography-item"
                                      >
                                          <div
                                              style={{
                                                  ...style,
                                                  marginBottom: "0.25rem",
                                              }}
                                          >
                                              {name}
                                          </div>
                                          <code
                                              style={{
                                                  fontSize: "0.8rem",
                                                  color: "#666",
                                              }}
                                          >
                                              {style.fontSize},{" "}
                                              {style.fontWeight},{" "}
                                              {style.lineHeight}
                                          </code>
                                      </div>
                                  )
                              )}
                          </div>
                      </>
                  )}

                  {/* Export buttons */}
                  <div className="mt-4 d-flex gap-2">
                      <button
                          className="btn btn-outline-primary"
                          onClick={() => exportAsJSON(output)}
                      >
                          📄 Export as JSON
                      </button>
                      <button
                          className="btn btn-outline-secondary"
                          onClick={() => exportAsSCSS(output.colors)}
                      >
                          💅 Export Colors as SCSS
                      </button>
                  </div>
              </>
          )}
      </div>
  );
};

export default Home;