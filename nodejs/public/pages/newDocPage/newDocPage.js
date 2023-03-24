const segmentsDiv = document.getElementById("segments");
const segments = [];

function addSegment() {
    const newSegment = document.createElement("div");
    
    let label = document.createElement("label");
    label.for = "segment";
    label.innerText = "label for segment: ";

    let input = document.createElement("input");
    input.type = "text";
    input.id = "segment";
    
    let preview = document.createElement("p");
    preview.id = "segmentPreview";
    preview.innerText = "No input yet";

    newSegment.appendChild(label);
    newSegment.appendChild(input);
    newSegment.appendChild(preview);

    segmentsDiv.appendChild(newSegment);
    
    const segmentObject = { type: "text", sequence: "-1", content: "" }
    segments.push(segmentObject);

    newSegment.addEventListener("input", () => updateSegment(input, preview, segmentObject));
}

function updateSegment(input, preview, segmentObject) {
    const value = input.value || "No input yet"; 
    preview.innerText = value; 
    segmentObject.content = value;
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
