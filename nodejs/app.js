import express from "express";
import path from "path";
import fs from "fs";

import docPages from "./utils/docPages/docPages.js"
import templateEngine from "./utils/templateEngine/templateEngine.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());

// Pages
const frontpage = fs.readFileSync("./public/pages/frontpage/frontpage.html").toString();
const newDocPage = fs.readFileSync("./public/pages/newDocPage/newDocPage.html").toString();

// Compiled pages
const frontpageCompiled = templateEngine.renderPage(frontpage, {tabTitle: "Welcome | Doc-Site"})
const newDocPageCompiled = templateEngine.renderPage(newDocPage, {tabTitle: "Make a new doc page | Doc-Site"})

app.get("/", (req, res) => {
    res.send(frontpageCompiled);
});

app.get("/docs/:pageTitle", (req, res) => {
    res.send(docPages.get(req.params.pageTitle));
});  

app.get("/new", (req, res) => {
    res.send(newDocPageCompiled);
});  

app.post("/api/segments", (req, res) => {
    docPages.create(req.body);
    res.sendStatus(200);
});  

app.get("/api/save", (req, res) => {
    docPages.save();
    res.sendStatus(200);
});

app.get("/api/docPages", (req, res) => {
    res.send(JSON.stringify(docPages.getAll()));
});

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } 
    console.log(`Server is running on port ${PORT}`);
});