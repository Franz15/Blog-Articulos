import React, { useEffect, useState } from "react";
import { Global } from "../helpers/Global";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const Archive = () => {
  const [archived, setArchived] = useState();

  useEffect(() => {
    getArchived();
  }, []);

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
    if (archived && archived.length > 0) {
      return archived.map((article) => {
        return (
          <Card
            style={{ marginTop: 20, margin: 50 }}
            bg={"light"}
            key={article._id}
          >
            <Card.Body style={{ padding: 20 }}>
              <Card.Title className="title text-center">
                {article.title}
                <br />
                <small className="text-muted">{article.author}</small>
              </Card.Title>

              <Card.Subtitle style={{ marginTop: 20 }}>
                {article.description}
              </Card.Subtitle>

              <Card.Text style={{ marginTop: 10 }}>
                {article.description}
                <br />
                {article.content}
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">
                  {moment(article.archiveDate).format("DD-MM-YYYY")}
                </small>
              </Card.Footer>

              <Button
                variant="danger"
                style={{ marginTop: 10 }}
                onClick={() => deleteArticle(article._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return (
        <Card style={{ marginTop: 20, margin: 50 }} bg={"light"}>
          <Card.Body style={{ padding: 20 }}>
            <Card.Text>Nothing to show</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }

  return archivedList();
};
