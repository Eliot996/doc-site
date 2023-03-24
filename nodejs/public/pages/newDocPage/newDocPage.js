const segmentsDiv = document.getElementById("segments");
const segments = [];
let segmentCount = 0;

function addTextSegment() {
    segments.push( { type: "text", sequence: segmentCount++, content: "" } );
    drawSegments();
}

function addCodeSegment() {
    segments.push( { type: "code", sequence: segmentCount++, content: "" } );
    drawSegments();
}

function updateSegment(input, preview, segment) {
    const value = input.value || "No input yet"; 
    preview.innerText = value; 
    segment.content = value;
}

function drawSegments() {
    segmentsDiv.innerHTML = "";
    const sortedSegments = segments.sort((a, b) => a - b);

    sortedSegments.forEach((segment) => {
        if (segment.type === "text") {
            drawTextSegment(segment);
        } else if (segment.type === "code") {
            drawCodeSegment(segment);
        }
    });
}

function drawCodeSegment (segment) {
    const newSegment = document.createElement("div");
    
    let label = document.createElement("h3");
    label.innerText = "Code";

    let input = document.createElement("textarea");
    input.cols = 40;
    input.rows = 5;
    input.value = segment.content
    
    const pre = document.createElement("pre");
    let preview = document.createElement("code");
    preview.innerText = segment.content || "No input yet";

    newSegment.appendChild(label);
    newSegment.appendChild(input);
    pre.appendChild(preview);
    newSegment.appendChild(pre);
    
    segmentsDiv.appendChild(newSegment);

    newSegment.addEventListener("input", () => updateSegment(input, preview, segment));
}

function drawTextSegment(segment) {
    const newSegment = document.createElement("div");
    
    let label = document.createElement("h3");
    label.innerText = "Text";

    let input = document.createElement("textarea");
    input.cols = 40;
    input.rows = 5;
    input.value = segment.content
    
    let preview = document.createElement("p");
    preview.innerText = segment.content || "No input yet";

    newSegment.appendChild(label);
    newSegment.appendChild(input);
    newSegment.appendChild(preview);
    
    segmentsDiv.appendChild(newSegment);

    newSegment.addEventListener("input", () => updateSegment(input, preview, segment));
}

function save() {
    fetch("/api/segments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title: document.getElementById("title").value, segments: segments}),
    });
}

document.getElementById("title").addEventListener("input", 
    () => updateSegment(
        document.getElementById("title"), 
        document.getElementById("docTitle")));
