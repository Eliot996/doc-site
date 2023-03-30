function deletePage(id) {
    const url = "/api/pages/" + id; 
    fetch(url, {
        method: 'DELETE',
      })
      .then((_response) => document.location = "/");
}