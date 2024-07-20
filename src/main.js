const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const nameElement = document.getElementById("name");
const playElement = document.getElementById("play");
const div1Element = document.getElementById("div1");
const div2Element = document.getElementById("div2");
const moneyElement = document.getElementById("money");
const mucCuocInput = document.getElementById("muc_cuoc");
const selectElement = document.getElementById("select");
const disableDataElement = document.getElementById("disable_data");
const notiElement = document.getElementById("noti");
const greenBarElement = document.getElementById("greenBar");
const redBarElement = document.getElementById("redBar");
const yellowBarElement = document.getElementById("yellowBar");

const validUsers = [
  { username: "admin", password: "admin" },
  { username: "thuannk1", password: "thuannk1" },
  { username: "namkt", password: "namkt" },
  { username: "thangdv", password: "thangdv" },
];

function login() {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const validUser = validUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (validUser) {
    start(validUser.username);
  }
}

function start(username) {
  nameElement.textContent = username;
  playElement.style.display = "block";
  div1Element.style.display = "none";
  div2Element.style.display = "none";
  const savedMoney = localStorage.getItem("money" + username);
  if (savedMoney) {
    moneyElement.textContent = savedMoney;
  }
}

function move() {
  const betAmount = parseInt(mucCuocInput.value);
  const currentMoney = parseInt(moneyElement.textContent);

  if (currentMoney < betAmount) {
    return;
  }

  notiElement.textContent = `Bạn đã cược ${betAmount} đồng`;
  moneyElement.textContent = currentMoney - betAmount;
  localStorage.setItem("money" + usernameInput.value, moneyElement.textContent);
  mucCuocInput.disabled = true;
  selectElement.disabled = true;

  disableDataElement.textContent = "Thứ tự về đích: ";

  let progressGreen = 0;
  let progressRed = 0;
  let progressYellow = 0;
  const topFinishers = [];

  const idGreen = setInterval(frameGreen, 1000);
  const idRed = setInterval(frameRed, 1000);
  const idYellow = setInterval(frameYellow, 1000);

  function frameGreen() {
    if (progressGreen >= 100) {
      clearInterval(idGreen);
    } else {
      const distance = getRandomInt(2, 10);
      progressGreen = Math.min(progressGreen + distance, 100);
      greenBarElement.style.width = progressGreen + "%";
      greenBarElement.textContent = progressGreen + "%";

      if (progressGreen === 100) {
        topFinishers.push(1);
        disableData(topFinishers);
        calculateWinnings(topFinishers);
      }
    }
  }

  function frameRed() {
    if (progressRed >= 100) {
      clearInterval(idRed);
    } else {
      const distance = getRandomInt(2, 10);
      progressRed = Math.min(progressRed + distance, 100);
      redBarElement.style.width = progressRed + "%";
      redBarElement.textContent = progressRed + "%";

      if (progressRed === 100) {
        topFinishers.push(2);
        disableData(topFinishers);
        calculateWinnings(topFinishers);
      }
    }
  }

  function frameYellow() {
    if (progressYellow >= 100) {
      clearInterval(idYellow);
    } else {
      const distance = getRandomInt(2, 10);
      progressYellow = Math.min(progressYellow + distance, 100);
      yellowBarElement.style.width = progressYellow + "%";
      yellowBarElement.textContent = progressYellow + "%";

      if (progressYellow === 100) {
        topFinishers.push(3);
        disableData(topFinishers);
        calculateWinnings(topFinishers);
      }
    }
  }

  function disableData(data) {
    disableDataElement.textContent = `Thứ tự về đích: ${data.join("; ")}`;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calculateWinnings(data) {
    if (data.length === 3) {
      mucCuocInput.disabled = false;
      selectElement.disabled = false;

      if (data[0] === parseInt(selectElement.value)) {
        moneyElement.textContent =
          parseInt(moneyElement.textContent) + betAmount * 4;
        notiElement.textContent = `Bạn đã thắng ${betAmount * 4} đồng`;
      } else {
        notiElement.textContent = `Bạn đã thua ${betAmount} đồng`;
      }

      localStorage.setItem(
        "money" + usernameInput.value,
        moneyElement.textContent
      );
    }
  }
}
