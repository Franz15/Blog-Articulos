import React from "react";
import { News } from "../components/News";
import { NewArticle } from "../components/NewArticle";
import { Archive } from "../components/Archive";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<News></News>}></Route>
        <Route path="/new" element={<NewArticle></NewArticle>}></Route>
        <Route path="/news" element={<News></News>}></Route>
        <Route path="/archive" element={<Archive></Archive>}></Route>

        <Route path="*" element={<News></News>} />
      </Routes>
    </BrowserRouter>
  );
};
