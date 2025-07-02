// src/components/FileForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FileForm = ({ onSubmit }) => {
  const [fileKey, setFileKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileKey.trim()) {
      onSubmit(fileKey.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Figma File Key</Form.Label>
        <Form.Control
          value={fileKey}
          onChange={(e) => setFileKey(e.target.value)}
          placeholder="e.g. AbC123def456XYZ"
        />
      </Form.Group>
      <Button className="mt-3" variant="primary" type="submit">
        Fetch Styles
      </Button>
    </Form>
  );
};

export default FileForm;
