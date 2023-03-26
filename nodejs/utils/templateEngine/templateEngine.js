import fs from "fs";
import escape from "escape-html";

const head   = fs.readFileSync("./public/components/head/head.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

const docPageFrame = fs.readFileSync("./public/components/doc-parts/frame.html").toString();
const codeBlock    = fs.readFileSync("./public/components/doc-parts/codeBlock.html").toString();
const textBlock    = fs.readFileSync("./public/components/doc-parts/textBlock.html").toString();

function renderPage(page, config={}) {
    const headCompiled = head.replace("$TAB_TITLE", config.tabTitle || "Upper")
                             .replace("$CSS_LINK",  config.cssLink  || "");

    return headCompiled + page + footer;
}

function buildAndPopulateDocPage(docPage) {
    console.log(docPage);
}

export default { renderPage, buildAndPopulateDocPage };
