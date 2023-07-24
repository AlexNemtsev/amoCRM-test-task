const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const getTimeString = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = seconds - hours * 3600 - minutes * 60;

  return (
    `${hours}`.padStart(2, "0") +
    ":" +
    `${minutes}`.padStart(2, "0") +
    ":" +
    `${secs}`.padStart(2, "0")
  );
};

const createTimerAnimator = () => {
  return (seconds) => {
    function tick() {
      if (seconds >= 0) {
        timerEl.textContent = getTimeString(seconds--);
        setTimeout(() => {
          tick();
        }, 1000);
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
