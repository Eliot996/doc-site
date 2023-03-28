import fs from "fs";

import segments from "./segments.json" assert {type: "json"};

let segmentCount = segments.reduce((accumulator, current) => accumulator < current.id ? current.id : accumulator, 0);

function create(newSegments, pageId) {
    newSegments.forEach(segment => {
        segment.id = ++segmentCount;
        segment.pageId = pageId;
        segments.push(segment);
    });
}

function get(pageId) {
    return segments.filter((segment) => pageId === segment.pageId);
}

function save() {
    fs.writeFileSync("./utils/docPages/segments/segments.json", JSON.stringify(segments));
}

export default {create, get, save};