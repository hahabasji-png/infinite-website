const facts = [
  "Bananas are berries, but strawberries are not!",
  "Sharks existed before trees.",
  "Octopuses have three hearts.",
  "Sloths can hold their breath longer than dolphins.",
  "Butterflies taste with their feet."
];

const factBox = document.getElementById("fact-box");
const btn = document.getElementById("next-btn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Randomly pick a fact
function randomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

// ---- Minigames ----
function bananaCatch() {
  let x = 200, y = 180, bananaX = Math.random()*380, bananaY = 0;
  let score = 0;
  
  function draw() {
    ctx.clearRect(0,0,400,200);
    ctx.fillStyle = "green";
    ctx.fillRect(x-20,y,40,10); // basket
    
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bananaX, bananaY, 10, 0, Math.PI*2);
    ctx.fill();
    
    bananaY += 3;
    if (bananaY > 200) {
      bananaX = Math.random()*380;
      bananaY = 0;
    }
    if (bananaY>170 && Math.abs(bananaX-x)<25) {
      score++;
      bananaX = Math.random()*380;
      bananaY = 0;
    }
    
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 10, 20);
    requestAnimationFrame(draw);
  }
  
  window.onmousemove = e => { 
    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
  };
  draw();
}

function sharkSwim() {
  let sharkX = 50, sharkY = 100, logs = [], score = 0;
  for (let i=0;i<3;i++) logs.push({x:400+i*150, y:Math.random()*170});
  
  function draw() {
    ctx.clearRect(0,0,400,200);
    ctx.fillStyle="gray";
    ctx.fillRect(sharkX, sharkY, 20, 20); // shark
    
    logs.forEach(log=>{
      ctx.fillStyle="brown";
      ctx.fillRect(log.x, log.y, 40, 10);
      log.x -= 3;
      if (log.x<-40) { log.x=400; log.y=Math.random()*170; score++; }
      if (sharkX<log.x+40 && sharkX+20>log.x && sharkY<log.y+10 && sharkY+20>log.y) {
        score=0; // reset on collision
      }
    });
    
    ctx.fillStyle="black";
    ctx.fillText("Score: "+score, 10,20);
    requestAnimationFrame(draw);
  }
  
  window.onkeydown = e => {
    if (e.key==="ArrowUp") sharkY-=20;
    if (e.key==="ArrowDown") sharkY+=20;
  };
  draw();
}

function triviaQuiz() {
  ctx.clearRect(0,0,400,200);
  ctx.fillStyle="black";
  ctx.font="16px sans-serif";
  ctx.fillText("Trivia: Which animal has 3 hearts?",20,50);
  ctx.fillText("A) Octopus   B) Cat   C) Whale",20,80);
  canvas.onclick = e=>{
    alert("Correct answer: Octopus 🐙");
  };
}

// ---- Main Controller ----
const games = [bananaCatch, sharkSwim, triviaQuiz];

function newFactGame() {
  factBox.textContent = randomFact();
  ctx.clearRect(0,0,400,200);
  const game = games[Math.floor(Math.random()*games.length)];
  game();
}

btn.addEventListener("click", newFactGame);
