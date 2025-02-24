import { useState, useEffect } from "react";
import "./App.css";

const options = [
  {
    id: "soft",
    title: "Soft - 3 min",
    duration_mins: 3,
  },
  {
    id: "medium",
    title: "Medium - 5 min",
    duration_mins: 5,
  },
  {
    id: "hard",
    title: "Hard - 7 min",
    duration_mins: 7,
  },
  {
    id: "extra_hard",
    title: "Extra hard - 10 min",
    duration_mins: 10,
  },
];

function App() {
  const [selected_ID, set_selected_ID] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.id === selected_ID);
    if (selectedOption) {
      setTimeLeft(selectedOption.duration_mins * 60);
    }
  }, [selected_ID]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (!isRunning) {
      const selectedOption = options.find((opt) => opt.id === selected_ID);
      if (selectedOption) {
        if (timeLeft === 0) {
          setTimeLeft(selectedOption.duration_mins * 60);
        }
        setIsRunning(true);
      }
    }
  };

  const resetTimer = () => {
    const selectedOption = options.find((opt) => opt.id === selected_ID);
    if (selectedOption) {
      setTimeLeft(selectedOption.duration_mins * 60);
    }
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionClick = (id) => {
    set_selected_ID(id);
    resetTimer();
  }

  return (
    <div className="container">
      <main>
        <h1>Egg Timer</h1>

        {/* options */}
        <div className="options_container">
          {options.map((option) => (
            <button
              key={option.id}
              className={
                "option " +
                (selected_ID === option.id
                  ? "selected"
                  : selected_ID !== ""
                  ? "notselected"
                  : "")
              }
              onClick={() => handleOptionClick(option.id)}
            >
              {option.title}
            </button>
          ))}
        </div>

        {/* Timer and icons, Desktop*/}
        <div className="timer_egg_container">
          <img
            src="assets/egg_thumbs_up.gif"
            alt="Egg thumbs up"
            className="egg_image"
          />

          <div className="timer_container">
            <p className={isRunning ? "runningTimer timer" : "timer"}>
              {formatTime(timeLeft)}
            </p>

            <hr />

            <div className="controls_container">
              <button className="control_btn" onClick={resetTimer}>
                <img
                  src="assets/icon_rewind.png"
                  alt="Reset Icon"
                  className={
                    isRunning ? "control_icon " : "control_icon running"
                  }
                />
              </button>
              <button className="control_btn" onClick={startTimer}>
                <img
                  src="assets/icon_start.png"
                  alt="Start Icon"
                  className={
                    isRunning ? "control_icon running" : "control_icon"
                  }
                />
              </button>
            </div>
          </div>

          <img
            src="assets/egg_jump.gif"
            alt="Egg jumping"
            className="egg_image"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
