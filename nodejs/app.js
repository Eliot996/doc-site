import express from "express";
import path from "path";

import docPages from "./utils/docPages/docPages.js"

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/frontpage/frontpage.html"));
});

app.get("/docs/:pageTitle", (req, res) => {
    res.send(docPages.get(req.params.pageTitle));
});  

app.get("/new", (req, res) => {
    res.sendFile(path.resolve("public/pages/newDocPage/newDocPage.html"));
});  

app.post("/api/segments", (req, res) => {
    docPages.create(req.body);
    res.sendStatus(200);
});  

app.get("/api/save", (req, res) => {
    docPages.save();
    res.sendStatus(200);
});

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } 
    console.log(`Server is running on port ${PORT}`);
});