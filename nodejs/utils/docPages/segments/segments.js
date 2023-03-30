import fs from "fs";

let segments = JSON.parse(fs.readFileSync("./utils/docPages/segments/segments.json"));

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

function deleteSegments(pageId) {
    segments = segments.filter((segments) => segments.pageId !== pageId);
}

export default {create, get, save, deleteSegments};