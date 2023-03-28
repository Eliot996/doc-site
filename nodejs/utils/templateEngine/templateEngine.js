import fs from "fs";
import escape from "escape-html";

const head   = fs.readFileSync("./public/components/head/head.html").toString();
const header = fs.readFileSync("./public/components/header/header.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

const docPageFrame = fs.readFileSync("./public/components/doc-parts/frame.html").toString();
const codeBlock    = fs.readFileSync("./public/components/doc-parts/codeBlock.html").toString();
const textBlock    = fs.readFileSync("./public/components/doc-parts/textBlock.html").toString();

function renderPage(page, config={}) {
    const headCompiled = head.replace("$TAB_TITLE", config.tabTitle || "Doc-Site")
                             .replace("$CSS_LINK",  config.cssLink  || "");

    return headCompiled + header + page + footer;
}

function buildAndPopulateDocPage(docPage) {
    console.log(docPage);
    let content = '';
    
    docPage.segments.forEach(segment => {
        switch (segment.type) {
            case 'text':
                content += textBlock.replace("$CONTENT", escape(segment.content).replace(/(\r\n|\n|\r)/gm, '<br/>')); 
                break;
            case 'code':
                content += codeBlock.replace("$CONTENT", escape(segment.content));
                break;
            default:
                break;
        }
    });

    content = docPageFrame.replace('$SEGMENTS', content)
                          .replace('$TITLE', docPage.title);
    
    return renderPage(content, {tabTitle: docPage + '| Doc-Site'});
}

export default { renderPage, buildAndPopulateDocPage };
