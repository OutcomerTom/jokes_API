
const catBtn = document.getElementById('catBtn');
const jokeBtn = document.getElementById('jokeBtn');
const jokeTXT = document.getElementById('jokeTxt');
const url = 'https://api.chucknorris.io/jokes';
const ul = document.querySelector('ul');
const h1 = document.querySelector('h1');

const addList = (categories) => {
    categories.forEach(categoryName => {
        const item = createListItem(categoryName);
        ul.appendChild(item);
    })
};

const createListItem = (titleOfItem) => {
    const item = document.createElement('li');
    item.className = 'item';
    item.innerHTML = `${titleOfItem}`

    item.onclick = () => {
        console.log(titleOfItem);
        changeHeader(titleOfItem);
        randInThisCategory(titleOfItem)
    }
    return item;
}

const randInThisCategory = (titleOfItem) => {
    const rand = `${url}/random?category=${titleOfItem}`
    fetch(rand)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data.value);
            jokeTxt.innerText = data.value;
        })
}

const changeHeader = (titleOfItem) => {
    h1.innerText = `Jokes about ${titleOfItem}`
}


catBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('clicked the button');
    const urlCat = `${url}/categories/`;

    const response = await fetch(urlCat);
    const data = await response.json();

    console.log(data)
    console.log(urlCat);
    addList(data);

    catBtn.className = 'btn-hidden';
    jokeBtn.className = 'btn-hidden';

    jokeTxt.innerText = '';

});

jokeBtn.addEventListener('click', () => {
    console.log('clicked the button');
    const urlRandom = `${url}/random`;
    fetch(urlRandom)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data.value);
            jokeTxt.innerText = data.value;
        })

})