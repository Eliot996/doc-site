import express from "express";
import path from "path";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/frontpage/frontpage.html"));
});

app.get("/new", (req, res) => {
    res.sendFile(path.resolve("public/pages/newDocPage/newDocPage.html"));
});  

app.post("/api/segments", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});  

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } 
    console.log(`Server is running on port ${PORT}`);
});