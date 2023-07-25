const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  return (seconds) => {
    let lastTime = Date.now();
    const finishTime = lastTime + seconds * 1000;
    let correction = 0;

    const tick = () => {
      const currentTime = Date.now();
      const delta = currentTime - lastTime;
      const remainedTime = finishTime - currentTime;

      console.log(remainedTime);

      if (delta >= 1000 + correction && currentTime <= finishTime) {
        timerEl.textContent = new Date(remainedTime).toLocaleTimeString(
          "ru-RU",
          {
            timeZone: "UTC",
          }
        );
        lastTime = currentTime;
        correction = 1000 - delta;
      }

      if (currentTime < finishTime) {
        requestAnimationFrame(tick);
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
