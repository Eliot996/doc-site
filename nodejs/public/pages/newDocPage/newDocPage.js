const segments = document.getElementById("segments");

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

    segments.appendChild(newSegment);

    newSegment.addEventListener("input", () => updateSegment(input, preview));
}

function updateSegment(input, preview) {
    preview.innerText = input.value || "No input yet";
}

document.getElementById("title").addEventListener("input", () => updateSegment(document.getElementById("title"), document.getElementById("docTitle")));