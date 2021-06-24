let canvas;
let context;
  
let request_id;
let fpsInterval = 100 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let xhttp;

let enemy = [];
let bosses = [];
let ally = [];
let bullet = [];
let score = 0;
let health = 3;
let lives = 3;

let survivor_enemies = [];
let survivor_bosses = [];
let survivor_bullets = [];
let killed;

let particles = [];

let diffx;
let diffy;

let backgroundImage = new Image();
let tilesPerRow = 16;
let tileSize = 16;

let background = [
    [4,16,16,16,16,76,77,78,79,16,16,16,16,16,76,77,78,79,16,16,16,16,16,76,77,78,79,16,16,16,16,4],
    [16,96,97,97,97,97,97,98,99,50,50,50,96,97,97,97,97,97,98,99,50,50,50,96,97,97,97,97,97,98,99,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,128,129,130,131,128,129,130,131,50,50,50,128,129,130,131,128,129,130,131,50,50,50,128,129,130,131,128,129,130,131,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,96,97,97,97,97,97,98,99,50,50,50,96,97,97,97,97,97,98,99,50,50,50,96,97,97,97,97,97,98,99,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,128,129,130,131,128,129,130,131,50,50,50,128,129,130,131,128,129,130,131,50,50,50,128,129,130,131,128,129,130,131,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,16],
    [16,96,97,97,97,97,97,98,99,50,50,50,96,97,97,97,97,97,98,99,50,50,50,96,97,97,97,97,97,98,99,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,50,50,50,112,113,113,113,113,113,114,115,16],
    [16,128,129,130,131,128,129,130,131,50,50,50,128,129,130,131,128,129,130,131,50,50,50,128,129,130,131,128,129,130,131,16],
    
    [4,16,16,16,16,76,77,78,79,16,16,16,16,16,76,77,78,79,16,16,16,16,16,76,77,78,79,16,16,16,16,4]

]

//initialise player
let player = {
    x : 30,
    y : 250,
    lives : 3, //player lives
    health : 5, //player health
    size : 10,
    length : 20,
    width : 50,
    height : 50,
    frameX : 0,
    frameY : 0
};


//testing food generating with dungeon sprite PNG is 16x16 make sprite bigger?
let food = {
    x : randint(0, 450),
    y : randint(0, 450),
    size : 10,
    width : 16,
    height : 16,
    frameX : 1,
    frameY : 13
};

// let boss = {
//     x : randint(50, 450),
//     y : 150,
//     size : 10,
//     width : 31,
//     height : 30,
//     frameX : 5,
//     frameY : 6
// };

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;
let shooting = false;

// 4 direction shooting
let shootLeft = false;
let shootRight = false;
let shootUp = false;
let shootDown = false;

let playerImage = new Image();
let foodImage = new Image();
let enemyImage = new Image();
let bossImage = new Image();
let bulletImage = new Image();

let startSound = new Audio("sound/puzzle-dreams.mp3");
let shotSound = new Audio("sound/shoot.mp3");
let enemyHitSound = new Audio("sound/hit_enemy.mp3");
let deathSound = new Audio("sound/death.mp3");
let playerDamageSound = new Audio("sound/ouch.mp3");
let winSound = new Audio("sound/win.mp3");
let collectSound = new Audio("sound/collect.mp3");
let playerHitSound = new Audio("sound/enemycollide.mp3")
let gameOverSound = new Audio("sound/gameover.mp3")

document.addEventListener("DOMContentLoaded", init, false);
            
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    playerImage.src = "images/cat.png";
    enemyImage.src = "images/dungeon2.png";
    foodImage.src = "images/dungeon2.png";
    bossImage.src = "images/dungeon2.png";
    backgroundImage.src = "images/dungeon2.png";
    bulletImage.src = "images/dungeon2.png";

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    draw();
}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    //background music play
    startSound.play();


    let health_element = document.querySelector("#health");
    health_element.innerHTML = health;
    let lives_element = document.querySelector("#lives");
    lives_element.innerHTML = lives;

    

    // draw enemy
    if (enemy.length < 7) {
        let a = {
            x : randint(20, canvas.width),
            y : randint(20, canvas.height),
            size : 16,
            width : 32,
            height : 30,
            frameX : 3,
            frameY : 6,
            xChange : randint(-3,3), // trying to slow down enemies
            yChange : randint(-3,3)
        }
        enemy.push(a);
    }

    // draw ally
    if (ally.length < 1)  {
        let f = {
            x : randint(100, canvas.width - 100),
            y : randint(100, canvas.height - 100),
            size : 10,
            width : 16,
            height : 16,
            frameX : 1,
            frameY : 12
        }
        ally.push(f);
    }

    // background math, changed r and c to 32
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 32; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

    // spawn a mini boss at a particular score, tougher enemies NOT FULLY WORKING
    if (score >= 20 && bosses.length < 4) {
        let boss = {
            x : randint(100, 450),
            y : randint(100, 450),
            size : 16,
            health : 3,
            width : 32,
            height : 30,
            frameX : 5,
            frameY : 6,
            xChange : randint(-2, 2),
            yChange : randint(-2, 2)
        }
        bosses.push(boss);
    }

    // alpha enemy draw
    context.fillStyle = "red";
    for (let a of enemy) {
        context.fillRect(a.x,a.y,a.size,a.size)
        context.drawImage(enemyImage,
            a.width * a.frameX, a.height * a.frameY, a.width, a.height,
            a.x - a.size/2, a.y - a.size/2, a.width, a.height); // added /2 to help with collisions
    }

    //testing
    // context.fillStyle = "yellow";
    // context.fillRect(496,496,16,16);


    for(let f of ally) {
        //draw food sprite
        context.drawImage(foodImage,
            f.width * f.frameX, f.height * f.frameY, f.width, f.height,
            f.x, f.y, f.width, f.height)
    }

    //draw bullet
    for (let b of bullet) {
        // var shootingSound = new Audio("laser.mp3");
        // shootingSound.play();
        // shootingSound.pause(); 
        context.fillStyle = "yellow";
        context.fillRect(b.x, b.y, b.size, b.size);
        // context.drawImage(bulletImage,
        //     player.x, player.y, b.size, b.size,
        //     player.x, player.y, b.size, b.size);
    }

    // for (let p of particles) {
    //     context.fillStyle = "orange";
    //     context.fillRect(p.x,p.y,p.size, p.size)
    // }

    // context.fillStyle = "white";
    // context.fillRect(player.x, player.y, player.size, player.length); //*2 to extend size of player, collison not working on 

    // draw player sprite
    // had to add the - player.width/2.5 and - player.height/2.5, due to white space on the sprite sheet
    context.drawImage(playerImage,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x - player.width/2.5, player.y - player.height/2.5, player.width, player.height);


    //draw boss sprite standard
    for (let boss of bosses) {
        // context.fillStyle = "blue";
        // context.fillRect(boss.x,boss.y,boss.size,boss.size);
        context.drawImage(bossImage,
            boss.width * boss.frameX, boss.height * boss.frameY, boss.width, boss.height,
            boss.x-8, boss.y-8, boss.width, boss.height);       
    }


    if (player.x + player.size >= canvas.width) {
        stop("You win!");
        return;
    }

    // dereks code from email for killing particular enemy, typo in survivor enemies was the issue
    for (let a of enemy) {
        let killed = false;
        survivor_enemies = [];
        if (player_collides(a)) {
            // deathSound.play();
            playerHitSound.play();
            health -= 1;
            killed = true;
            if (! killed) {
                survivor_enemies.push(a);
            }
            enemy = survivor_enemies;

        if (health <= 0) {
            lives -= 1;
            health = 3;
            deathSound.play();
        }

        if (lives === 0) {
            gameOverSound.play();
            stop("Game over!");
            return;
        }
            // stop("You lose!");
            // return;
        }
    }
    let score_element = document.querySelector("#score");
    survivor_enemies = [];
    let killed;
    for (let a of enemy) {
        killed = false;
        survivor_bullets = [];

        for (let b of bullet) {
            if (hit_enemy(a,b)) {
                enemyHitSound.play();
                score += 5;
                score_element.innerHTML = score;
                killed = true;
            } else {
                survivor_bullets.push(b);
           }
        }
        bullet = survivor_bullets;
        if (! killed) {
            survivor_enemies.push(a);
        }
    }
    enemy = survivor_enemies;

    // kill a boss, edited from Dereks code, bosses have more health, take several hits, or can be hurt with spacebar shoot
    for (let boss of bosses) {
        let killed = false;
        survivor_bosses = [];
        if (player_collides(boss)) {
            // deathSound.play();
            playerHitSound.play();
            health -= 2;
            killed = true;
            if (! killed) {
                survivor_bosses.push(boss);
            }
        bosses = survivor_bosses;

        if (health <= 0) {
            lives -= 1;
            health = 3;
            deathSound.play();
            // stop("You were killed!");
            // return;
        }

        if (lives === 0) {
            gameOverSound.play();
            stop("Game over!");
            return;
        }
            // stop("You lose!");
            // return;
        }
    }
    // let score_element = document.querySelector("#score");
    survivor_bosses = [];
    // let killed;
    for (let boss of bosses) {
        killed = false;
        survivor_bullets = [];

        for (let b of bullet) {
            if (hit_enemy(boss,b)) {
                enemyHitSound.play();
                // score += 5;
                boss.health -=1;
                score_element.innerHTML = score;
                if (boss.health === 0) {
                    killed = true;
                    score += 10;
                }
                // killed = true;
            } else {
                survivor_bullets.push(b);
           }
        }
        bullet = survivor_bullets;
        if (! killed) {
            survivor_bosses.push(boss);
        }
    }
    bosses = survivor_bosses;

    // player collects an ally, score goes up by 5, score multiplier?
    for (let food of ally) {
        if (eat_ally(food)) {
            collectSound.play();
            score += 10;
            health += 1;
            let score_element = document.querySelector("#score");
            score_element.innerHTML = score;
            ally.splice(food);
            draw_ally();
            // if (score >= 50) {
            //     // winSound.play();
            //     // stop("Level complete, try level 2!");
            //     // return;
            // }
            if (player.health <= 0) {
                let deathAudio = new Audio("dead.wav");
                deathAudio.play()
            }
            }
        }
    
    // enemy movement
    // for (let a of enemy) {
    //     if (a.x + a.size < 0) {
    //         a.x = canvas.width;
    //         a.y = randint(0, canvas.height);
    //     } else {
    //         a.x = a.x + a.xChange;
    //         a.y = a.y + a.yChange;
    //     } 
    // }

    // updated bounce enemies off walls method

    for (let a of enemy) {

        a.x = a.x + a.xChange;
        a.y = a.y + a.yChange;

        if (a.x + a.size > (canvas.width-a.size)) { // right wall bounce works 
            a.xChange = -a.xChange;
            a.x = (canvas.width-a.size) - a.size;
        } else {
            a.xChange = a.xChange
        }

        if (a.x - a.size < 0) { // left wall bounce works
            a.xChange = -a.xChange
            a.x = a.size
        } else {
            a.xChange = a.xChange
        }

        if (a.y + a.size > (canvas.height-a.size)) { // bottom wall bounce works 
            a.yChange = -a.yChange
            a.y = (canvas.height-a.size) - a.size
        } else {
            a.yChange = a.yChange
        }

        if (a.y - a.size < 0) { // top wall bounce works
            a.yChange = -a.yChange
            a.y = a.size
        }    
    }
    
    // player hitting walls handling
    if (player.x <= (0+16)) { // left wall works
        player.x = 16;
    }

    if (player.x >= (canvas.width-32)) { // right wall works
        player.x = canvas.width-32;
    }

    if (player.y <= (0+16)) { //top wall works
        player.y = 16;
    }

    if (player.y >= (canvas.height - 32)) { // bottom wall works
        player.y = canvas.height - 32;

    } // bottom wall

    // original boss movement
    // for (let boss of bosses) {
    //     if (boss.x + boss.size < 0) {
    //         boss.x = canvas.width;
    //         boss.y = randint(0, canvas.height);
    //     } else {
    //         boss.x = boss.x + boss.xChange;
    //         boss.y = boss.y + boss.yChange;
    //     } 
    // }

    // updated bounce bosses off walls

    for (let boss of bosses) {

        boss.x = boss.x + boss.xChange;
        boss.y = boss.y + boss.yChange;

        if (boss.x + boss.size > (canvas.width-boss.size)) { // right wall bounce works 
            boss.xChange = -boss.xChange;
            boss.x = (canvas.width-boss.size) - boss.size;
        } else {
            boss.xChange = boss.xChange
        }

        if (boss.x - boss.size < 0) { // left wall bounce works
            boss.xChange = -boss.xChange
            boss.x = boss.size
        } else {
            boss.xChange = boss.xChange
        }

        if (boss.y + boss.size > (canvas.height-boss.size)) { // bottom wall bounce works 
            boss.yChange = -boss.yChange
            boss.y = (canvas.height-boss.size) - boss.size
        } else {
            boss.yChange = boss.yChange
        }

        if (boss.y - boss.size < 0) { // top wall bounce works
            boss.yChange = -boss.yChange
            boss.y = boss.size
        }    
    }

    // bullet movement
    for (let b of bullet) {
        b.x = b.x + b.xChange;
        b.y = b.y + b.yChange;
    }

    
    // movement SPRITES DONT CYCLE
    if (moveLeft) {
        player.x = player.x - player.size/3;
        player.frameX = 8;
        player.frameY = 2;
    }
    if (moveRight) {
        player.x = player.x + player.size/3;
        player.frameX = 4;
        player.frameY = 0;
    }
    if (moveUp) {
        player.y = player.y - player.size/3;
        // player.frameX = 4;
        player.frameY = 2;
    }
    if (moveDown) {
        player.y = player.y + player.size/3;
        player.frameX = 6;
        player.frameY = 5;
    }


    // finish level score not needed here 
    // if (score >= 100) {
    //     winSound.play();
    //     stop("Level complete, try level 2!");
    //     return;
    // }

    // shooting only works in one direction this way, to the right. changed to a power shot, WORK ON REQUIREMENTS
    if (shooting) {
        var shootingSound = new Audio();
        shootingSound.play();
        
        player.frameX = 4;
        player.frameY = 1;
        let b = { //shoot right
            x : player.x,
            y : player.y, 
            size : 10,
            xChange : 10,
            yChange : 0 
        }
        bullet.push(b);
        context.fillStyle = "yellow";
        shooting = false;
    }

    // shoot left
    if (shootLeft) {
        player.frameX = 8;
        player.frameY = 2;
        let b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : -10,
            yChange : 0,
            frameX : 6,
            frameY : 9
        }
        bullet.push(b);
        shotSound.play();
        context.fillStyle = "yellow";
        shootLeft = false;
    }

    // shoot up
    if (shootUp) {
        player.frameX = 4;
        player.frameY = 2;
        let b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : 0,
            yChange : -10
        }
        bullet.push(b);
        shotSound.play();
        context.fillStyle = "yellow";
        shootUp = false;
    }

    // shoot right
    if (shootRight ) {
        player.frameX = 4;
        player.frameY = 1;
        let b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : 10,
            yChange : 0
        }
        bullet.push(b);
        shotSound.play();
        context.fillStyle = "yellow";
        shootRight = false;
    }

    // shoot down
    if (shootDown ) {
        player.frameY = 1;
        let b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : 0,
            yChange : 10
        }
        bullet.push(b);
        shotSound.play();
        context.fillStyle = "yellow";
        shootDown = false;
    }
    
    // bullet generation on canvas
    for (let b of bullet) {
        context.fillRect(b.x, b.y, b.size, b.size);
    }

    // create rocket shoot on spacebar?


// // getting enemy to follow player,  enemies constantly follow player. idea adapted from youtube video.
    for (let a of enemy) {

        diffx = player.x - a.x; //getting difference between player x and enemy x
        diffy = player.y - a.y; //getting difference between player y and enemy y

        if (diffx > 0) {
            a.x += 3; 
        } else {
            a.x -= 3;
        }

        if (player.x === a.x && diffx > 0) {
            a.x += 2;
        } else if (player.x === a.x && diffx < 0) {
            a.x -= 2;
        }

        if (diffy > 0) {
            a.y += 3;
        } else {
            a.y -= 3;
        }
    }

    


    // border handling 
    if (player.x + player.size >= canvas.width-16) {
        player.xChange = 0;
        player.yChange = 0;

        // stop("dead");
        // return;
    }
    // original border handling where player died when hit the edges, changed when added dungeon walls.
    // if (player.x + player.size <= 16) {
    //     stop("dead");
    //     return;
    // }
    // if (player.y + player.size >= canvas.height-16) {
    //     stop("dead");
    //     return;
    // }
    // if (player.y + player.size <= 16) {
    //     stop("dead");
    //     return;
    // }

    // if (player_collides(a)) {
    //     stop("killed by enemy :(");
    //     return;
    // }
}

function randint( min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//draws new ally when ally eaten
function draw_ally() {
    if (ally.length < 1)  {
        let f = {
            x : randint(0, 450),
            y : randint(0, 450),
            size : 10,
            width : 16,
            height : 16,
            frameX : 1,
            frameY : 12,
            xChange : randint(-5, 1),
            yChange : randint(5, -1)
        }
        ally.push(f);
    }
}

//draws new enemy when enemy killed, helpful when trying to respawn enemies in different locations after initial enemy wave
function draw_enemy() {
    if (enemy.length < 5)  {
        let a = {
            x : randint(200, canvas.width),
            y : randint(80, canvas.height),
            size : 10,
            xChange : randint(-2, 2),
            yChange : randint(2, -2)
        }
        console.log("second enemy wave")

        // trying to keep enemies from spawning on top of the player
        if (canvas.width - player.x < 100) {
            a.x = randint(0,player.x -50);
        } else {
            a.x = randint(player.x-50, canvas.width-50);
        }
        if (canvas.height - player.y < 100) {
            a.y = randint(0,player.y -50);
        } else {
            a.y = randint(player.y-50, canvas.height-50);
        }
        enemy.push(a);
    }
}

//hit animation NOT WORKING, NEED TO ADD X CHANGE Y CHANGE ETC
function hit_animate(a) {
    if (particles.length < 10) {
        for ( let p of particles ) {
            let p = {
                x : a.x,
                y : a.y,
                xChange : 0,
                yChange : 0,
                size : 2
            }
        particles.push(p)
        context.fillRect(p.x, p.y, p.size, p.size);
        p.x = p.x + p.xChange;
        p.y = p.y + p.yChange;
        p.yChange = p.yChange + 1.5;
        }
    }
}

// trying to adapt this for death animation
// for (let p of particles) {
//     context.fillRect(p.x, p.y, p.size, p.size);
// }
// for (let p of particles) {
//     p.x = p.x + p.xChange;
//     p.y = p.y + p.yChange;
//     p.yChange = p.yChange + 1.5; // gravity
// }



//key presses
function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === " ") {
        shooting = true;
    } else if (key === "a" || key === "A") {
        shootLeft = true;
    } else if (key === "w" || key === "W") {
        shootUp = true;
    } else if (key === "d" || key === "D") {
        shootRight = true;
    } else if (key === "s" || key === "S") {
        shootDown = true;
    }
}

//key releases
function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === " "){
        shooting = false;
    } else if (key === "a" || key === "A") {
        shootLeft = false;
    } else if (key === "w" || key === "W") {
        shootUp = false;
    } else if (key === "d" || key === "D") {
        shootRight = false;
    } else if (key === "s" || key === "S") {
        shootDown = false;
    }
}

//player collides with enemy
function player_collides(a) {
    if (player.x + player.size*1.2 < a.x ||
        a.x + a.size < player.x ||
        player.y > a.y + a.size || 
        a.y > player.y + player.length*1.4) { // changed last part to player.length due to sprite issue, collision not working
        return false; 
    } else {
        return true;
    }
}

//player collides with ally
function eat_ally(f) {
    if (player.x + player.size < f.x ||
        f.x + f.size < player.x ||
        player.y > f.y + f.size ||
        f.y > player.y + player.size) {
            return false;
    } else {
        return true;
    }
}

//bullet collides with enemy
function hit_enemy(b,a) {
    if (b.x + b.size < a.x ||
        a.x + a.size < b.x ||
        b.y > a.y + a.size ||
        a.y > b.y + b.size) {
            return false;
    } else {
        return true;
    }
}

//bullet collides with boss
function hit_boss(b,boss) {
    if (b.x + b.size < boss.x ||
        boss.x + boss.size < b.x ||
        b.y > boss.y + boss.size ||
        boss.y > b.y + b.size) {
            return false;
    } else {
        return true;
    }
}  

//bullet hits mini boss
function hit_miniboss(b,bo) {
    if (b.x + b.size < bo.x ||
        bo.x + bo.size < b.x ||
        b.y > bo.y + bo.size ||
        bo.y > b.y + b.size) {
            return false;
    } else {
        return true;
    }
}


function stop(outcome) {
    window.cancelAnimationFrame(request_id);
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    // let health_element = document.querySelector("#health");
    // health_element.innerHTML = health;
    let score_element = document.querySelector("#score");
    score_element.innerHTML = score;
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome;
    startSound.pause(); //turns off background music
    gameOverSound.play(); //plays game over music, may need to move
    
    let data = new FormData();
    data.append("score", score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "/store_score", true);
    xhttp.send(data); 
}

function handle_response() {
    // check that response has fully arrived
    if ( xhttp.readyState === 4 ) {
        // check the request was successful
        if ( xhttp.status === 200 ) {
            if ( xhttp.responseText === "success" ) {
            //score was sucessfully stored in db
            } else {
            // score was not successfully stored in db
            }
        }
    }
}

function handle_response2() {
    // check that response has fully arrived
    if ( xhttp.readyState === 4 ) {
        // check the request was successful
        if ( xhttp.status === 200 ) {
            let response = JSON.parse(xhttp.responseText)
            liked_count_element.innerHTML = response.count + " likes";
        }
    }
}


