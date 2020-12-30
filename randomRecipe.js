const url = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
const param = window.location.hash.substring(1) !== undefined ? '?id=' + window.location.hash.substring(1) : null

// GET random recipe
fetch(url + param)
    .then(res => res.json())
    .then(data => changeToText(data))
    
let recipeInfo

const changeToText = (data) => {
    recipeInfo = data
    document.location.hash = data._id
    document.getElementById('title').innerText = data.title
    document.getElementById('description').innerText = data.desc
    document.getElementById('dish-photo').src = data.picture
    document.getElementById('servings').innerText = data.servings

    const ingredients = document.getElementById('ingredients')
    for (const [ingredient, serving] of Object.entries(data.ingredients)) {
        const item = document.createElement('li')
        const servings = document.createElement('span')
        servings.className = 'count'
        servings.setAttribute('base', serving)
        servings.innerText = serving
        item.appendChild(servings)
        item.innerHTML += " " + ingredient
        ingredients.appendChild(item)
    }
    
    data.instructions.forEach(instruction => {
        const item = document.createElement('li')
        item.innerText = instruction
        document.getElementById('instructions').appendChild(item)
    })

    document.getElementById('dish-rating').innerText = currentRating(data.ratings)
}

// POST rating
document.addEventListener('click', event => {
    if (event.target.id === 'post-rating')
        postRating()
})

const postRating = () => {  
    const tempRating = document.getElementById('select-rating')
    const rating = tempRating.options[tempRating.selectedIndex].value

    const body = {
        id: recipeInfo._id,
        rating: rating
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(() => {
        recipeInfo.ratings.push(rating)
        document.getElementById('dish-rating').innerText = currentRating()
    })
    .catch((err) => {
        console.log(err);
    })
}

const currentRating = () => {
    const numberOfRatings = recipeInfo.ratings.length
    let total = 0
    
    recipeInfo.ratings.forEach(element => {
        let rating = Number(element)
        total += rating
    });

    return Math.round(total / numberOfRatings * 10) / 10
}