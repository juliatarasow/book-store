
'use strict';

const books = [
    {
        id: 1,
        type: 'classics',
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        length: 336,
        price: 18.04,
        discount: 10,
        color: 'green',
        image: './images/mockingbird.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 2,
        type: 'classics',
        name: 'Little Women',
        author: 'Louisa May Alcott',
        length: 528,
        price: 6.17,
        discount: 0, 
        color: 'green',
        image: './images/little.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 3,
        type: 'classics',
        name: 'Beloved',
        author: 'Toni Morrison',
        length: 321,
        price: 20.99,
        discount: 5,
        color: 'green',
        image: './images/beloved.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 4,
        type: 'comics',
        name: 'Watchmen',
        author: 'Alan Moore',
        length: 416,
        price: 10.84,
        discount: 0,
        color: 'dodgerblue',
        image: './images/watchmen.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 5,
        type: 'comics',
        name: 'The Walking Dead',
        author: 'Robert Kirkman',
        length: 1088,
        price: 30.05,
        discount: 5,
        color: 'dodgerblue',
        image: './images/walkingdead.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 6,
        type: 'mystery',
        name: 'The Night Fire',
        author: 'Michael Connelly',
        length: 416,
        price: 18.90,
        discount: 5,
        color: 'orange',
        image: './images/nightfire.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 7,
        type: 'mystery',
        name: 'Sherlock Holmes',
        author: 'Sir Arthur Conan Doyle',
        length: 164,
        price: 6.41,
        discount: 0,
        color: 'orange',
        image: './images/holmes.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 8,
        type: 'horror',
        name: 'Carrie',
        author: 'Stephen King',
        length: 304,
        price: 7.99,
        discount: 5,
        color: 'red',
        image: './images/carrie.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 9,
        type: 'adventure',
        name: 'Life of Pi',
        author: 'Yann Martel',
        length: 326,
        price: 7.50,
        discount: 0,
        color: 'purple',
        image: './images/pi.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    
];

/*
1- calculate the last price according to discount amount, create new key lastPrice in book object
2- dynamically get the book types from data and place them in div.select container with input checkbox and label
3- get user choices via input elements
4- create a function for book template 
5- filter books according to user selection
6- show selected books in browser
7- add books to cart 
*/


// ******** 1- calculate the last price according to discount amount, create new key lastPrice in book object  ***********
// discount in % 
function calcLastPrice() {
    this.lastPrice = +(this.price * (1 - this.discount / 100)).toFixed(2);
}

books.forEach(function (item) {
    calcLastPrice.call(item);
});

// console.log(books[0]);


// ********* 2- dynamically get the book types from data and place them in div.select container with input checkbox and label ***
// new Set() returns array-like objects , but they are NOT ARRAY. You can not use map, filter, find etc. methods
// to convert it to ARRAY we have 2 options : 1) Array.from(array-likeObject) , 2) [...array-likeObject] spread operator

// let types = Array.from(new Set(books.map(item => item.type)))
let types = [...new Set(books.map(item => item.type))]
// console.log(types);

types.forEach(item => {

    let newCheckboxElem = `
        <label>
                <input type="checkbox" value=${item} onchange="getInputValue(this)">
            ${item[0].toUpperCase() + item.slice(1).toLowerCase()}
        </label>
        `;
    
    document.querySelector('.select').insertAdjacentHTML('beforeend', newCheckboxElem);
});



// ***************** 3- get user choices via input elements *****************************

let desiredBookTypesArr = [];

function getInputValue(elem) {
    // console.log(elem);
    // console.log(elem.value);

    if (elem.checked) {
        //console.log('elem is checked')
        !desiredBookTypesArr.includes(elem.value) ? desiredBookTypesArr.push(elem.value) : null;

        filterBooks(desiredBookTypesArr);
        

    } else {
        //console.log('elem is UN-checked')
        desiredBookTypesArr = desiredBookTypesArr.filter(item => item !== elem.value);

        desiredBookTypesArr.length === 0 ? filterBooks(types) : filterBooks(desiredBookTypesArr);
        
    }

    // console.log('desiredBookTypesArr :', desiredBookTypesArr);
}



// ********** 4- create a function for book template ************************

function showBook(book) {

    let bookTemplate = `
        <div class="book_outbox">
            <div class="book">
                <img src=${book.image} alt=${book.name}>
                <div class="right">
                    <div class="head">
                        <h3>${book.name}</h3>
                        <span class="type" style="background:${book.color}">${book.type}</span>
                    </div>
                    <p><b>Author :</b> <span class="author">${book.author}</span></p>
                    <p><b>Length :</b> <span class="length">${book.length} pages</span></p>
                    <p><b>Price :</b> ${book.discount ? `<span class="oldprice">${book.price}</span> <span>${book.lastPrice}$</span>` : `<span>${book.price} $</span>`}</p>
                    <p><b>Description :</b> <span class="description">${book.description}</span></p>
                    <button data-hasan=${book.id} class="button">Add to Cart</button>
                </div>
            </div>
        </div> 
    `;

    document.querySelector('.products').insertAdjacentHTML('beforeend', bookTemplate);
}

// books.forEach(item => showBook(item));





// ********* 5- filter books according to user selection ************************+

let booksToShowArr = [];

function filterBooks(arr) {
    // console.log(arr);

    booksToShowArr = books.filter(item => arr.includes(item.type))

    // console.log(booksToShowArr);

    document.querySelector('.products').innerHTML = '';


    for (let item of booksToShowArr) {
        showBook(item)
    }
}

if (desiredBookTypesArr.length === 0) {
    filterBooks(types);
}



// ************* 7- add books to cart **************************
let cartArr = [];

document.querySelector('.products').addEventListener('click', (event) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.closest('.button'))
    
    let btnElem = event.target.closest('.button');

    if (btnElem) {
        btnElem.style.backgroundColor = 'black';
        btnElem.textContent = 'Added';
        btnElem.style.color = 'white';
    
    
        let buttonId = +btnElem.dataset.hasan;
        console.log(buttonId)
    
        let book = books.find(item => item.id === buttonId);
        console.log(book)
    
        cartArr.push(book);
        console.log(cartArr);
    
        
        let cartItemNums = +document.querySelector('.cartItem').textContent;
        cartItemNums++;
        document.querySelector('.cartItem').textContent = cartItemNums;
    }
    
})


