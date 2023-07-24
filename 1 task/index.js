const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  return (seconds) => {
    // Использование константы correction позволяет предотвратить пропуск 1-ой секунды
    // после запуска таймера. Во избежании такого эффекта можно было бы увеличить частоту
    // обновления анимации, или использовать requestAnimationFrame() вместо setTimeout()
    const correction = 999;
    const finishTime = Date.now() + seconds * 1000 + correction;

    const tick = () => {
      const currentTime = Date.now();
      const remainedTime = finishTime - currentTime;

      timerEl.textContent = new Date(remainedTime).toLocaleTimeString("ru-RU", {
        timeZone: "UTC",
      });

      if (remainedTime >= correction) {
        setTimeout(tick, 1000);
      }
    };

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
