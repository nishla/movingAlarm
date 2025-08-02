let alarmTimeout;
let correctAnswer = 0;

function setAlarm() {
  const alarmInput = document.getElementById("alarmTime").value;
  if (!alarmInput) return alert("Please set a valid time!");

  const [hour, minute] = alarmInput.split(":").map(Number);
  const now = new Date();
  const alarmTime = new Date();
  alarmTime.setHours(hour, minute, 0, 0);

  if (alarmTime <= now) alarmTime.setDate(alarmTime.getDate() + 1);

  const timeToAlarm = alarmTime.getTime() - now.getTime();

  document.getElementById("status").innerText = "✅ Alarm is set!";
  document.getElementById("setAlarmBtn").style.display = "none";

  alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
}

function triggerAlarm() {
  document.getElementById("alarmSound").play();
  document.getElementById("centerClock").style.display = "block";
  generateMathProblem();
  generateBubbles(40);
  document.getElementById("challengeBox").style.display = "block";
  document.getElementById("status").innerText = "🔔 WAKE UP! Solve to stop!";
  moveStopButtonWhenHovered();
}

function generateMathProblem() {
  const problems = [
    () => `(${rand(1, 9)} + ${rand(2, 6)}) * ${rand(2, 4)}`,
    () => `${rand(10, 30)} / ${rand(2, 5)} + ${rand(1, 6)}`,
    () => `${rand(2, 5)} * (${rand(3, 9)} - ${rand(1, 4)})`
  ];

  const selected = problems[Math.floor(Math.random() * problems.length)];
  const problemText = selected();
  correctAnswer = Math.round(eval(problemText) * 100) / 100;

  document.getElementById("mathProblem").innerText = `Solve: ${problemText}`;
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answerInput").value);
  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    stopAlarm();
  } else {
    alert("Incorrect! Try again.");
    generateMathProblem();
  }
}

function checkAns() {
  const userAnswer = parseFloat(document.getElementById("answerInput").value);
  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    return true
  }else{}
}

function stopAlarm() {
  const alarm = document.getElementById("alarmSound");
  alarm.pause();
  alarm.currentTime = 0;

  document.getElementById("challengeBox").style.display = "none";
  document.getElementById("centerClock").style.display = "none";
  document.getElementById("status").innerText = "✅ Alarm stopped. You’re awake!";
  document.getElementById("setAlarmBtn").style.display = "inline-block";
  document.getElementById("bubble-container").innerHTML = "";
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBubbles(count) {
  const container = document.getElementById("bubble-container");
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = 3 + Math.random() * 4 + "s";
    container.appendChild(bubble);
  }
}

function moveStopButtonWhenHovered() {
  const btn = document.getElementById("stopBtn");
  const input = document.getElementById("answerInput");

  btn.addEventListener("mouseenter", () => {
    if (!checkAns()) {
      const x = Math.random() * (window.innerWidth - btn.offsetWidth);
      const y = Math.random() * (window.innerHeight - btn.offsetHeight);
      btn.style.position = "absolute";
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
    }
  });

  input.addEventListener("input", () => {
    if (checkAns()) {
      btn.style.position = "relative";
      btn.style.left = "unset";
      btn.style.top = "unset";
    }
  });
}


setTimeout(()=>{
    triggerAlarm()
}, 5000)