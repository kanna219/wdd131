let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let pageContent = document.querySelector('body');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current === 'dark') {
        pageContent.style.backgroundColor = "#333";
        pageContent.style.color = "white";
        logo.src = "images/byui-logo-white.png";
    } else {
        pageContent.style.backgroundColor = "white";
        pageContent.style.color = "black";
        logo.src = "images/byui-logo-blue.webp";
    }
}