const listbook = document.getElementById("book-list");

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createBook(name, author, year, isCompleted) {
    const book = {
        id: uuidv4(),
        name: name,
        author: author,
        year: year,
        isCompleted: isCompleted
    };
    return book;
}

function createCardBook(book) {
    return `
    <div
    class="flex items-start flex-col justify-between p-4 h-45 rounded-lg bg-gray-50 dark:bg-gray-800"
  >
  <div class="flex flex-row">
    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">${book.year}</span>
    ${book.isCompleted ? `<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Finished</span>` : `<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Unfinished</span>`}
  </div>
  <h2 class="mt-3 text-xl font-semibold dark:text-white text-gray-800">${book.name}</h2>
  <p class="mt-3 dark:text-white text-gray-800">Author: ${book.author}</p>
  <div class="flex flex-row mt-3">
    <button onclick="confirmDelete('${book.id}')"; data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 inline-flex items-center py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        <svg class="w-[21px] h-[21px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
          </svg>
          
        Delete
        </button>
        
        <button onclick="confirmUpdate('${book.id}')" data-modal-target="update-modal" data-modal-toggle="update-modal" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center">
            <svg class="w-[21px] h-[21px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clip-rule="evenodd"/>
              </svg>
              
              
            Update
            </button>
           
  </div>
  </div>
    `;
}

function getAllBook() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        return JSON.parse(storedBooks);
    } else {
        return [];
    }
}

function saveBook() {
    const insertForm = document.forms["insert-form"];
    const name = insertForm["name"].value;
    const author = insertForm["author"].value;
    const year = insertForm["year"].value;
    const isCompleted = insertForm["is-completed"].checked;
    const book = createBook(name, author, year, isCompleted);

    let books = [];
    if (localStorage.getItem('books') !== null) {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    listbook.innerHTML = getAllBook().map(createCardBook).join("");
}

function deleteBook(id) {
    let books = JSON.parse(localStorage.getItem('books'));
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = "index.html";
}


function confirmDelete(id) {
    const confirmButton = document.getElementById("delete-btn");
    confirmButton.addEventListener("click", function () {
        deleteBook(id);
    });
}

function updateBook(id, book) {
    let books = JSON.parse(localStorage.getItem('books'));
    const index = books.findIndex(book => book.id === id);
    books[index] = book;
    localStorage.setItem('books', JSON.stringify(books));
}

function confirmUpdate(id) {
    const updateForm = document.forms["update-form"];
    const isCompleted = updateForm["is-completed"].checked;
    const confirmButton = document.getElementById("update-btn");
    const bookDetail = JSON.parse(localStorage.getItem('books')).find(book => book.id === id);
    updateForm["name"].value = bookDetail.name;
    updateForm["author"].value = bookDetail.author;
    updateForm["year"].value = bookDetail.year;
    updateForm["is-completed"].checked = bookDetail.isCompleted;

    confirmButton.addEventListener("click", function () {
        const name = updateForm["name"].value;
        const author = updateForm["author"].value;
        const year = updateForm["year"].value;
        const isCompleted = updateForm["is-completed"].checked;
        const book = createBook(name, author, year, isCompleted);
        updateBook(id, book);
        listbook.innerHTML = getAllBook().map(createCardBook).join("");
    });
}

function initPage() {
    const bookData = getAllBook();
    const queryKeyword = new URLSearchParams(window.location.search).get('keyword');
    if (queryKeyword) {
        listbook.innerHTML = bookData.filter(book => book.name.toLowerCase().includes(queryKeyword.toLowerCase())).map(createCardBook).join("");
    } else {
        listbook.innerHTML = bookData.map(createCardBook).join("");
    };

}

initPage();
