import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Global } from "../helpers/Global";
import { Alert } from "react-bootstrap";

export const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      author,
      description,
      content,
      date: new Date(),
    };

    const response = await fetch(Global.url + "save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === "success") {
        setTitle("");
        setAuthor("");
        setDescription("");
        setContent("");
        setAlertSuccess(true);
      }
    } else {
      setAlertError(true);
      console.error("Error creating the article.");
    }
  };

  return (
    <>
      {alertSuccess ? (
        <Alert variant="success" className="text-center mt-4 mx-auto w-75">
          Article successfully created
        </Alert>
      ) : null}
      {alertError ? (
        <Alert variant="danger" className="text-center mt-4 mx-auto w-75">
          Error creating the article
        </Alert>
      ) : null}

      <Card
        className="mt-4 mx-auto w-75"
        style={{
          backgroundColor: "#f8f9fa",
          borderColor: "#e0e0e0",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Body className="p-4">
          <Card.Title className="text-center">Create a New Article</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                type="button"
                href="/"
                style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
              >
                Create Article
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewArticle;
