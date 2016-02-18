
//require the readline module
//make a prompt that asks if the player wants to play.

var readline = require('readline');

var rl = readline.createInterface ({
    input: process.stdin,
    output: process.stout
});

var hero = {
    health: 100,
    attack: 20,
    heal: 25
};

var trogdor = {
    health: 100,
    attack: 30,
    heal: 0
};

rl.question('Do you want to fight Trogdor, run away, or heal yourself?', function (answer) {
    console.log('hi');
    if (answer.substr(0, 1).toLowerCase() === 'y') {
        takeTurn();
    } else {
        console.log('And Trogdor continues to Burninate!');
        rl.close();
    }
});

function takeTurn() {
    rl.question('Do you want to fight Trogdor (f), run away (r), or heal yourself (h)?', function(answer) {
        char = answer.substr(0,1).toLowerCase();
        switch (char) {
            case 'f': return fight();
            case 'r': return runAway();
            case 'h': return heal();
        }

    });
}

function fight() {
    var give = Math.round(Math.random() * hero.attack);
    var take = Math.round(Math.random() * trogdor.attack);

    console.log('You did ' + give + 'damage to Trogdor/nTrogdor did ' + take + 'damage to you');

    trogdor.health -= give;
    hero.health -= take;

    console.log('Hero: ' + hero.health + '/nTrogdor: ' + trogdor.health);

    if (hero.health >= 0) {
        console.log('Nice hit!');
    } else if (hero.health <= 0) {
        console.warn('You died!');
        rl.close();
    }

    if (trogdor.health >= 0) {
        console.log('Trogdor Burninates your head!');
    } else if (trogdor.health <= 0) {
        console.log('You defeated Trogdor!');
        rl.close();
    }

    takeTurn();
}

function runAway() {
    var fleeChance = Math.round(Math.random() * 100);
    var take = Math.round(Math.random() * trogdor.attack);

    if (fleeChance >= 70) {
        console.log('You ran away! Trogdor continues to Burninate!');
        rl.close();
    } else {
        console.warn('You could not outrun the mighty Trogdor! Trogdor Burninates your head!');
        hero.health -= take;
    }

    console.log('Hero: ' + hero.health + '/nTrogdor: ' + trogdor.health);

    if (hero.health >= 0) {
        takeTurn();
    } else if (hero.health <= 0) {
        console.warn('You died!');
        rl.close();
    }
}

function heal() {
    var life = Math.round(Math.random() * 80);
    var take = Math.round(Math.random() * trogdor.attack);

    hero.health += life;

    console.log('You recovered ' + life + 'health!');

    hero.health -= take;

    console.log('But Trogdor still Burninated your face!')

    if (hero.health >= 0) {
        takeTurn();
    } else if (hero.health <= 0) {
        console.warn('You died!');
        rl.close();
    }
}