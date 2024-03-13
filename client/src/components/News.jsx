import React, { useEffect, useState } from "react";
import { Global } from "../helpers/Global";
import io from "socket.io-client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Card from "react-bootstrap/Card";
const socket = io("http://localhost:5555");

export const News = () => {
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getNews();
    socket.on("change", () => {
      getNews();
    });

    return () => {
      socket.off("change");
    };
  }, []);

  const handleModal = (props) => {
    setSelected(props);
    setShow(true);
  };
  const getNews = async () => {
    setShow(false);
    const response = await fetch(Global.url + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "news" }),
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const news = await response.json();
    setArticles(news.articles);
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
    setShow(false);
    Archive(id);
    const newArticles = articles.filter((el) => el._id !== id);
    setArticles(newArticles);
  };

  function newsList() {
    if (articles && articles.length > 0) {
      return articles.map((article) => {
        return (
          <Card
            style={{ marginTop: 20, margin: 50 }}
            bg={"light"}
            key={article._id}
            onClick={() => handleModal(article)}
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
                  {moment(article.date).format("DD-MM-YYYY")}
                </small>
              </Card.Footer>

              <Button
                variant="secondary"
                style={{ marginTop: 10 }}
                onClick={() => archiveArticle(article._id)}
              >
                Archive
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

  return newsList() /* <>
   <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          {selected ? (
                  <Modal.Title id="modal-title" >{selected.title} </Modal.Title>
                ) : (
                  <Modal.Title id="modal-title"> </Modal.Title>
                )}
         
        </Modal.Header>
        <Modal.Body> 
          {selected ? (
                  <Modal.Body id ="modal-body">
                    <Card.Subtitle className="mb-2 text-muted">{selected.author}</Card.Subtitle>
                 
                {selected.content}
                  <br/>
                  <Card.Subtitle className="mb-2 text-muted"><small>{moment(selected.date).format("DD-MM-YYYY")}</small></Card.Subtitle>
                </Modal.Body>
                ) : (
                  <Modal.Title id="modal-title"> </Modal.Title>
                )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={() => archiveArticle(selected._id)}>
            Archive
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
    </Modal>*/;
};
