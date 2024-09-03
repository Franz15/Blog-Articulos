import React, { useEffect, useState } from "react";
import { Global } from "../helpers/Global";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const Archive = () => {
  const [archived, setArchived] = useState();
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    getArchived();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const getArchived = async () => {
    const response = await fetch(Global.url + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "archived" }),
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const archivedArt = await response.json();
    setArchived(archivedArt.articles);
    setLoading(false);
  };

  const Archive = async (id) => {
    const request = await fetch(Global.url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      return data.status;
    } else {
    }
  };

  const archiveArticle = (id) => {
    Archive(id);
    const newArchived = archived.filter((el) => el._id !== id);
    setArchived(newArchived);
  };

  const Delete = async (id) => {
    const request = await fetch(Global.url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      return data.status;
    } else {
    }
  };

  const deleteArticle = (id) => {
    Delete(id);
    const newArchived = archived.filter((el) => el._id !== id);
    setArchived(newArchived);
  };

  function archivedList() {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      );
    } else if (archived && archived.length > 0) {
      return archived.map((article) => {
        const isExpanded = expandedCardId === article._id;
        return (
          <Card
            className="mt-4 mx-auto w-75"
            key={article._id}
            style={{
              backgroundColor: "#f8f9fa",
              borderColor: "#e0e0e0",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => toggleExpand(article._id)}
          >
            <Card.Body className="p-4">
              <Card.Title className="text-center">
                {article.title}
                <br />
                <small className="text-muted">{article.author}</small>
              </Card.Title>

              <Card.Subtitle className="mt-3 text-secondary">
                {article.description}
              </Card.Subtitle>

              <Card.Text className="mt-3">
                {isExpanded
                  ? article.content
                  : article.content.substring(0, 100) + "..."}
              </Card.Text>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <small className="text-muted">
                  {moment(article.archiveDate).format("DD-MM-YYYY")}
                </small>
                <div>
                  <Button
                    variant="secondary"
                    onClick={() => archiveArticle(article._id)}
                    className="me-2"
                  >
                    Unarchive
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteArticle(article._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return (
        <Card className="mt-4 mx-auto w-75" bg={"light"}>
          <Card.Body style={{ padding: 20 }}>
            <Card.Text>Nothing to show</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }

  return archivedList();
};
