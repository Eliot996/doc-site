import segments from "./segments/segments.js"
import templateEngine from "../templateEngine/templateEngine.js";

const pages = [];
let pageCount = pages.reduce((accumulator, current) => accumulator < current.id ? current.id : accumulator, 0);

function create(page) {
    page.id = ++pageCount;

    segments.create(page.segments, page.id);

    pages.push({id: page.id, title: page.title, compiledPage: templateEngine.buildAndPopulateDocPage(page)})
}

function get(pageTitle) {
    const foundPage = pages.find((page) => pageTitle === page.title);

    if (foundPage) {
        foundPage.segments = segments.get(foundPage.id);
    }

    return foundPage.compiledPage;
}

export default {create, get};