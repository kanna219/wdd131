const player = {
    name: "Momoteam",
    hp: 50,
    dango: 3,
    image: "images/momoteam_1.png",
    attackers: ['Momotarou', 'Monkey', 'Dog', 'Pheasant'],
    
    attack: function (oni) {
        if (this.hp <= 0) {
            alert("You are dead and cannot attack.");
            return; 
        }

        const attackerName = this.attackers[Math.floor(Math.random() * this.attackers.length)];
        let damage = 0;

        if (attackerName === 'Momotarou') {
            damage = 15;
        } else if (attackerName === 'Monkey') {
            damage = 10;
        } else if (attackerName === 'Dog') {
            damage = 7;
        } else if (attackerName === 'Pheasant') {
            damage = 5;
        }

        oni.hp -= damage;
        if (oni.hp < 0) {
            oni.hp = 0;
        }

        document.querySelector("#battleLog").innerHTML = `<p><strong>${attackerName}</strong> attacked ${oni.name}, ${damage} damage!</p>`;
        renderStatus(); 
    },

    heal: function () {
    if (this.hp <= 0) {
    alert("You are dead and cannot heal.");
    return false;
    }

    if (this.dango <= 0) {
        alert("No dango left!");

        document.querySelector("#battleLog").innerHTML =
            "<p>No dango left!</p>";

        return false;
    }

    this.dango -= 1;
    this.hp += 15;

    if (this.hp > 50) {
        this.hp = 50;
    }

    const log = document.querySelector("#battleLog");

    log.innerHTML = "<p>Momotarou team ate a Kibi-dango!</p>";

    this.attackers.forEach(function (attacker) {
        log.innerHTML += `<p>${attacker} is energized!</p>`;
    });

    renderStatus();
    return true;
}
};

const enemy = {
    name: "ONI",
    hp: 70,
    image: "images/oni_1.png",
    types: ['Red Oni', 'Blue Oni', 'Yellow Oni'],
    
    attack: function (target) {
        if (this.hp <= 0) return;

        const chosenOni = this.types[Math.floor(Math.random() * this.types.length)];
        let damage = 0;

        if (chosenOni === 'Red Oni') {
            damage = 10;
        } else if (chosenOni === 'Blue Oni') {
            damage = 7;  
        } else if (chosenOni === 'Yellow Oni') {
            damage = 5; 
        }

        target.hp -= damage;
        if (target.hp < 0) {
            target.hp = 0;
        }

        document.querySelector("#battleLog").innerHTML = `<p><strong>${chosenOni}</strong> attacked! ${damage} damage to ${target.name}!</p>`;
        renderStatus();
    }
};

function updateDango() {
    if (player.dango === 3) {
        return "● ● ●";
    } else if (player.dango === 2) {
        return "● ● 〇";
    } else if (player.dango === 1) {
        return "● 〇 〇";
    } else {
        return "〇 〇 〇";
    }
}

function renderStatus() {
    // HP BAR STATUS
    document.querySelector("#player-hp-val").textContent = player.hp;
    document.querySelector("#enemy-hp-val").textContent = enemy.hp;


    // DANGO STATUS 
    document.querySelector("#dango-count").textContent = player.dango;
    document.querySelector("#dango-dots").textContent = updateDango();

    updateCharacterImages();

}

renderStatus();

document.querySelector("#attack-btn").addEventListener("click", function () {
    player.attack(enemy);

    if (enemy.hp > 0 && player.hp > 0) {
        setTimeout(function () {
            enemy.attack(player);
        }, 1000);
    } else if (enemy.hp <= 0) {
        document.querySelector("#battleLog").innerHTML =
            "<p><strong>You defeated the Oni!</strong></p>";
    }
});

document.querySelector("#heal-btn").addEventListener("click", function () {

    const healed = player.heal();

    if (healed && enemy.hp > 0 && player.hp > 0) {
        setTimeout(function () {
            enemy.attack(player);
        }, 1000);
    }
});


function updateCharacterImages() {
    if (player.hp <= 15) {
        document.querySelector("#player-img").src = "images/tukare_momo_1.png"; 
    } else {
        document.querySelector("#player-img").src = player.image; 
    }

    if (enemy.hp <= 15) {
        document.querySelector("#enemy-img").src = "images/tukare_oni_1.png"; 
    } else {
        document.querySelector("#enemy-img").src = enemy.image; 
    }
}