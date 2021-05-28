const Days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Months = [
  "",
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let pre = [];
for (let i = 0; i <= 12; i++) {
  pre.push(0);
}

for (let i = 1; i <= 12; i++) {
  pre[i] += pre[i - 1] + Days[i];
}

function f(x) {
  let month = 0;
  for (let i = 1; i <= 12; i++) {
    if (pre[i - 1] <= x && x <= pre[i]) {
      month = i;
      break;
    }
  }
  let date = x - pre[month - 1];

  let ans = Months[month] + " " + date;
  return ans;
}

response = -1;
state = 1;
x = 0;
questionsAsked = 0;

document.getElementById("yes").onclick = function () {

  response = 1;
  game();
};

document.getElementById("no").onclick = function () {

  response = 0;
  game();
};


l = 1;
r = 366;
m = Math.floor((l + r) / 2);
date = f(m);

function game() {

  if (l > r) {
    message = f(m) + " ! ";
    document.getElementById("message").innerHTML = message;
    return;
  }
  if (state == 1) {
    correctOrNot();
    state++;
  } else if (state == 2) {
    beforeAfter();
    state = 1;
  }

}

function ask() {
  // ask
  questionsAsked++;
  document.getElementsByClassName("counter")[0].innerHTML = questionsAsked;
  m = Math.floor((l + r) / 2);

  date = f(m);

  message = "Is it " + date + " ? ";
  document.getElementById("message").innerHTML = message;

  return;
}

function correctOrNot() {


  // correctOrNot
  questionsAsked++;
  document.getElementsByClassName("counter")[0].innerHTML = questionsAsked;

  if (response == 1 || l === r) {
    message = f(m) + " ! ";
    document.getElementById("message").innerHTML = message;
    r = l - 1;
  } else {

    // beforeAfter
    x = Math.floor(Math.random() * 100) % 2;

    if (x === 0) {
      message = "Is it before " + date + " ? ";
      document.getElementById("message").innerHTML = message;


    } else {
      message = "Is it after " + date + " ? ";
      document.getElementById("message").innerHTML = message;

    }
  }
}
function beforeAfter() {
  if (x == 0) {
    if (response == 1) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  } else {
    if (response == 0) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }

  ask();

}
