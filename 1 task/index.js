const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  return (seconds) => {
    // Использование константы correction позволяет на протяжении секунды отображать
    // начальное время таймера
    const correction = 999;
    const finishTime = Date.now() + seconds * 1000 + correction;

    const tick = () => {
      const currentTime = Date.now();
      const remainedTime = finishTime - currentTime;

      timerEl.textContent = (new Date(remainedTime)).toLocaleTimeString('ru-RU', { timeZone: 'UTC'});

      if (remainedTime >= correction) {
        requestAnimationFrame(tick);
      }
    }

    tick();
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (event) => {
  const regex = /^[0-9]+$/;
  const { target } = event;
  const inputVal = target.value;

  if (!regex.test(target.value)) {
    target.value = inputVal.substring(0, inputVal.length - 1);
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
