document.addEventListener('click', event => {
    if (event.target.id === "add") updateCount(1);
    if (event.target.id === "subtract") updateCount(-1);
})

const updateCount = (val) => {
    const updatedServings = Number(document.getElementById('servings').textContent) + val;

    if (updatedServings < 1) return;
    
    document.getElementById('servings').textContent = updatedServings;

    Array.prototype.map.call(document.getElementsByClassName('count'), num => {
        const multiplier = Number(num.getAttribute('base'));
        num.textContent = +(multiplier * updatedServings).toFixed(2);
    })
}