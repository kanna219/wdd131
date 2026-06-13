const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "snortleblat.webp",

    attacked: function () {

        if (this.health === 0) {
            alert("Character Died.");
            return;
        }  

        this.health -= 20;

        if (this.health < 0) {
        this.health = 0;
        }
        
        renderCharacter();
    },

    levelUp: function () {
        this.level++;
        renderCharacter();
    }
};

function renderCharacter() {
    document.querySelector("#name").textContent = character.name;
    document.querySelector("#class").textContent = character.class;
    document.querySelector("#level").textContent = character.level;
    document.querySelector("#health").textContent = character.health;

    document.querySelector("#image").setAttribute("src", character.image);
    document.querySelector("#image").setAttribute("alt", character.name);
}

renderCharacter();

document.querySelector("#attack-btn").addEventListener("click", function () {
    character.attacked();
});

document.querySelector("#level-btn").addEventListener("click", function () {
    character.levelUp();
});