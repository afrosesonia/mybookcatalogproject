const API_BASE = "http://localhost:8080/api/books";

document.addEventListener("DOMContentLoaded", fetchBooks);

function fetchBooks() {
    fetch(API_BASE)
        .then(res => res.json())
        .then(data => {
            const bookList = document.getElementById("bookList");
            bookList.innerHTML = "";
            data.forEach(book => {
                bookList.innerHTML += `
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${book.author} (${book.year})</h6>
                                <p class="card-text">${book.description}</p>
                                <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

function addBook() {
    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        description: document.getElementById("description").value,
        year: parseInt(document.getElementById("year").value)
    };

    fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    })
    .then(() => {
        fetchBooks();
        document.getElementById("bookForm").reset();
    });
}

function deleteBook(id) {
    fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
    })
    .then(() => fetchBooks());
}

function searchBooks() {
    const query = document.getElementById("searchInput").value;
    fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            const bookList = document.getElementById("bookList");
            bookList.innerHTML = "";
            data.forEach(book => {
                bookList.innerHTML += `
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${book.author} (${book.year})</h6>
                                <p class="card-text">${book.description}</p>
                                <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}
