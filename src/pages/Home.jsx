// src/pages/Home.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FileForm from '../components/FileForm';
import { getFileData } from '../api/figma';

const Home = () => {
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async (fileKey) => {
    setError(null);
    setOutput(null);
    try {
      const data = await getFileData(fileKey);
      setOutput(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-4">
      <h1>🎨 Figma Style Extractor</h1>
      <FileForm onSubmit={handleFetch} />
      {error && <p className="text-danger mt-3">{error}</p>}
      {output && (
        <pre className="mt-4 bg-light p-3">
          {JSON.stringify(output.document.name, null, 2)}
        </pre>
      )}
    </Container>
  );
};

export default Home;
