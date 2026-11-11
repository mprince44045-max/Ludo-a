const players = [
    { name: "Red", team: "A", id: "t-red" },
    { name: "Green", team: "B", id: "t-green" },
    { name: "Yellow", team: "A", id: "t-yellow" },
    { name: "Blue", team: "B", id: "t-blue" }
];

let currentPlayerIndex = 0;
let currentDiceValue = 0;
let sixCount = 0; // 3 baar 6 aane par turn cancel

const diceElement = document.getElementById('dice');
const rollBtn = document.getElementById('roll-btn');
const cheatBtn = document.getElementById('cheat-btn');
const statusText = document.getElementById('status');
const msgBox = document.getElementById('msg-box');

function updateTurnUI() {
    const p = players[currentPlayerIndex];
    statusText.innerText = `Player ${currentPlayerIndex + 1} (${p.name} - Team ${p.team}) ki baari`;
}

// Normal Random Dice
rollBtn.addEventListener('click', () => {
    let val = Math.floor(Math.random() * 6) + 1;
    processRoll(val);
});

// Testing ke liye Force 6 Dice
cheatBtn.addEventListener('click', () => {
    processRoll(6);
});

function processRoll(val) {
    rollBtn.disabled = true;
    cheatBtn.disabled = true;
    
    // Animation
    let count = 0;
    let anim = setInterval(() => {
        const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        diceElement.innerText = emojis[Math.floor(Math.random() * 6)];
        count++;
        if(count > 10) {
            clearInterval(anim);
            finalizeRoll(val);
        }
    }, 50);
}

function finalizeRoll(val) {
    const emojis = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    diceElement.innerText = emojis[val];
    currentDiceValue = val;
    
    const currentPlayer = players[currentPlayerIndex];
    msgBox.innerText = `${currentPlayer.name} ne ${val} pheka!`;

    // Move Token Animation (Basic)
    const token = document.getElementById(currentPlayer.id);
    if (token) {
        let currentTop = parseFloat(token.style.top) || 0;
        token.style.transform = `translateY(-${val * 5}px)`;
        setTimeout(() => {
            token.style.transform = `translateY(0px)`;
        }, 500);
    }

    // Ludo Rules Logic
    if (val === 6) {
        sixCount++;
        if (sixCount === 3) {
            msgBox.innerText = "3 baar 6 aaya! Turn cancel.";
            sixCount = 0;
            endTurn();
        } else {
            msgBox.innerText = "6 aaya! Aapko ek aur baari mili.";
            enableDice();
        }
    } else {
        sixCount = 0;
        endTurn();
    }
}

function endTurn() {
    setTimeout(() => {
        currentPlayerIndex = (currentPlayerIndex + 1) % 4;
        updateTurnUI();
        enableDice();
    }, 1000);
}

function enableDice() {
    rollBtn.disabled = false;
    cheatBtn.disabled = false;
}

// Start Game
updateTurnUI();
