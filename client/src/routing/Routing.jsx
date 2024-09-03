import React from "react";
import { News } from "../components/News";
import { NewArticle } from "../components/NewArticle";
import { Archive } from "../components/Archive";
import { NotFound } from "../components/NotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<News></News>}></Route>
        <Route path="/home" element={<News></News>}></Route>

        <Route path="/write" element={<NewArticle></NewArticle>}></Route>
        <Route path="/news" element={<News></News>}></Route>
        <Route path="/archive" element={<Archive></Archive>}></Route>

        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </BrowserRouter>
  );
};
