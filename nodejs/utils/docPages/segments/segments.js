const segments = [];
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

export default {create, get};