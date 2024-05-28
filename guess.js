// 0〜99の乱数を生成し、1を足す
let randomNumber = Math.floor(Math.random() * 100) + 1;

// セレクタでHTMLにおけるそれぞれのクラスをオブジェクトに代入
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

// 変数の初期化
let guessCount = 1;
let resetButton;

// 入力された数字が正解かどうかをチェック
function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'これまで推測した値:';
  }
  guesses.textContent += userGuess + ' ';
  if (userGuess === randomNumber) {
    lastResult.textContent = 'おめでとうございます!正解です!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = '不正解!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = '正解より小さいです!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = '正解より大きいです!';
    }
  }
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = '新しいゲームを始める';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);
  guesses.disabled = false;
  guesses.textContent = '';
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.valse = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}