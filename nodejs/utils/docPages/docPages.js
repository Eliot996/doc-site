import segments from "./segments/segments.js"

const pages = [];
let pageCount = pages.reduce((accumulator, current) => accumulator < current.id ? current.id : accumulator, 0);

function create(page) {
    page.id = ++pageCount;
    pages.push({id: page.id, title: page.title})
    segments.create(page.segments, page.id);
}

function get(pageTitle) {
    const foundPage = pages.find((page) => pageTitle === page.title);

    if (foundPage) {
        foundPage.segments = segments.get(foundPage.id);
    }

    return foundPage;
}

export default {create, get};