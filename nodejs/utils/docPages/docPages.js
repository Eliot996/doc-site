import fs from "fs";

import segments from "./segments/segments.js";
import templateEngine from "../templateEngine/templateEngine.js";

import pages from "./pages.json" assert {type: "json"};


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

    return foundPage.compiledPage || templateEngine.buildAndPopulateDocPage(foundPage);
}

function getAll() {
    return pages.map(page => { return { id: page.id, title: page.title } })
}

function save() {
    fs.writeFileSync("./utils/docpages/pages.json", JSON.stringify(
        pages.map((page) => {
            return {...page, compiledPage: ""}}
        )
    ));
    segments.save();
}

export default {create, get, getAll, save};