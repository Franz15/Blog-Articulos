import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-start vh-100 pt-5">
      <Card
        className="w-75"
        style={{
          backgroundColor: "#f8f9fa",
          borderColor: "#e0e0e0",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Body className="p-4 text-center">
          <Card.Title className="display-1 fw-bold text-danger mb-4">
            404
          </Card.Title>
          <Card.Subtitle className="mb-4 fs-4 text-secondary">
            Oops! Page Not Found
          </Card.Subtitle>
          <Card.Text className="mb-4">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </Card.Text>
          <Link to="/">
            <Button
              style={{
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
              }}
            >
              Return to the homepage
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};
