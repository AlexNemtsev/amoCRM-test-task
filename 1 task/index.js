const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  return (seconds) => {
    const startTime = Date.now();
    const finishTime = startTime + seconds * 1000;
    buttonEl.setAttribute('disabled', 'disabled');

    const tick = () => {
      const currentTime = Date.now();
      const remainedTime = finishTime - currentTime;

      if (remainedTime >= 0) {
        const time = new Date(remainedTime).toLocaleTimeString(
          "ru-RU",
          {
            timeZone: "UTC",
          }
        );
        if (timerEl.textContent !== time) {
          timerEl.textContent = time;
        }
        requestAnimationFrame(tick);
      } else {
        buttonEl.removeAttribute('disabled');
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
