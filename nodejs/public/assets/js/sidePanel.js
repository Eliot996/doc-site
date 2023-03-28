const links = document.getElementById("pageLinks");

links.innerHTML = "";

fetch("/api/docPages").then(response => response.json()).then(result => {
    result.forEach(page => {
        const link = document.createElement("a");
        link.href = `/docs/${page.title}`;
        link.innerText = page.title;
        links.appendChild(link);
    });
});