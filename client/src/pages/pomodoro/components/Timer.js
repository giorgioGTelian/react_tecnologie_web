/* eslint-disable no-restricted-globals */
import { useCallback, useEffect } from "react";
import Icon from "./Icon";
import Progress from "./Progress";
import { useDispatch, useSelector } from "react-redux";
import { incrementRound, setMode } from "../../../state/timerSlice";
import {
  CONFIRM,
  LONG_BREAK,
  POMODORO,
  SHORT_BREAK,
  START,
  STOP,
  TIME_FOR_A_BREAK,
  TIME_TO_FOCUS,
} from "../constants";
import { updateFavicon, updateTitle, formatTime } from "../helpers";
import useCountdown from "../useCountdown";
import { player } from "../util";
import { Box, Button, Typography } from "@mui/material";

const buttonSound = player({
  asset: "sounds/button-press.wav",
  volume: 0.5,
});

const tickingAudio = player({
  loop: true,
});

const alarmAudio = player({});

const SecondaryButton = ({ children, active, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontSize: "1rem",
        padding: "0.125rem 0.75rem",
        height: "1.75rem",
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "white",
        transition: "transform 0.1s ease-in-out",
        "&:active, &.active": {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          transform: "translateY(0.125rem)",
        },
      }}
    >
      {children}
    </Button>
  );
};

const PrimaryButton = ({ active, onClick, color }) => (
  <Button
    onClick={onClick}
    sx={{
      padding: "0 0.75rem",
      boxShadow: "rgb(235, 235, 235) 0 0.375rem 0",
      fontSize: "1.375rem",
      height: "3.4375rem",
      fontWeight: 600,
      minWidth: "12.5rem",
      backgroundColor: "white",
      textTransform: "uppercase",
      transition: "color 0.5s ease-in-out 0s",
      "&.active": {
        transform: "translateY(0.375rem)",
        boxShadow: "none",
      },
      "&.pomodoro": {
        color: "var(--primary-color)",
      },
      "&.short_break": {
        color: "var(--secondary-color)",
      },
      "&.long_break": {
        color: "var(--tertiary-color)",
      },
    }}
  >
    {active ? STOP : START}
  </Button>
);

const NextButton = ({ onClick, className }) => (
  <Button onClick={onClick} sx={{color: "white"}} className={className}>
    <Icon name="skip_next" size={48} />
  </Button>
);

export default function Timer() {
  const dispatch = useDispatch();
  const {
    mode,
    round,
    modes,
    tickingSound,
    tickingVolume,
    alarmSound,
    alarmVolume,
    autoPomodoros,
    autoBreaks,
  } = useSelector((state) => state.timer);

  const { ticking, start, stop, reset, timeLeft, progress } = useCountdown({
    minutes: modes[mode].time,
    onStart: () => {
      updateFavicon(mode);
      if (mode === POMODORO) {
        tickingAudio.play();
      }
    },
    onStop: () => {
      updateFavicon();
      if (mode === POMODORO) {
        tickingAudio.stop();
      }
    },
    onComplete: () => {
      next();
      if (mode === POMODORO) {
        tickingAudio.stop();
      }
      alarmAudio.play();
    },
  });

  useEffect(() => {
    updateTitle(timeLeft, mode);
  }, [mode, timeLeft]);

  const jumpTo = useCallback(
    (id) => {
      reset();
      updateFavicon(id);
      dispatch(setMode(id));
    },
    [dispatch, reset]
  );

  useEffect(() => {
    tickingAudio.stop();
    tickingAudio.setAudio(tickingSound);
    if (ticking && mode === POMODORO) {
      tickingAudio.play();
    }
  }, [mode, ticking, tickingSound]);

  useEffect(() => {
    alarmAudio.setAudio(alarmSound);
  }, [alarmSound]);

  useEffect(() => {
    tickingAudio.setVolume(tickingVolume);
  }, [tickingVolume]);

  useEffect(() => {
    alarmAudio.setVolume(alarmVolume);
  }, [alarmVolume]);

  const next = useCallback(() => {
    switch (mode) {
      case LONG_BREAK:
      case SHORT_BREAK:
        jumpTo(POMODORO);
        if (autoPomodoros) {
          start();
        }
        break;
      default:
        jumpTo(SHORT_BREAK);
        dispatch(incrementRound());
        if (autoBreaks) {
          start();
        }
        break;
    }
  }, [dispatch, jumpTo, mode, autoPomodoros, autoBreaks, start]);

  const confirmAction = useCallback(
    (cb) => {
      let allowed = true;
      if (ticking) {
        stop();
        allowed = confirm(CONFIRM);
        start();
      }

      if (allowed) {
        cb();
      }
    },
    [start, stop, ticking]
  );

  const confirmNext = useCallback(() => {
    confirmAction(next);
  }, [confirmAction, next]);

  const confirmJump = useCallback(
    (id) => {
      confirmAction(() => jumpTo(id));
    },
    [confirmAction, jumpTo]
  );

  const toggleTimer = useCallback(() => {
    buttonSound.play();
    if (ticking) {
      stop();
    } else {
      start();
    }
  }, [start, stop, ticking]);

  return (
    <Box>
      <Progress percent={progress} />
      <Box
        sx={{
          maxWidth: "30rem",
          margin: "auto",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "1.25rem 0 1.875rem",
            borderRadius: "0.375rem",
            marginBottom: "1.25rem",
            width: "100%",
          }}
        >
          <Box component="ul" sx={{ padding: 0, margin: 0, listStyle: "none" }}>
            {Object.values(modes).map(({ id, label }) => (
              <SecondaryButton
                key={id}
                active={id === mode}
                id={id}
                onClick={() => confirmJump(id)}
              >
                {label}
              </SecondaryButton>
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: "6.25rem",
              lineHeight: "8.6875rem",
              fontWeight: 600,
              marginTop: "1.25rem",
              userSelect: "none",
              "@media screen and (min-width: 992px)": {
                fontSize: "7.5rem",
              },
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              margin: "1.25rem 0 0",
            }}
          >
            <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }} />
            <PrimaryButton
              active={ticking}
              onClick={toggleTimer}
            />
                        <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <NextButton
                className={ticking }
                onClick={confirmNext}
              />
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            opacity: 0.6,
            marginBottom: "0.25rem",
          }}
        >
          #{round}
        </Typography>
        <footer
          sx={{
            fontSize: "1.125rem",
            fontWeight: 400,
          }}
        >
          {mode === POMODORO ? TIME_TO_FOCUS : TIME_FOR_A_BREAK}
        </footer>
      </Box>
    </Box>
  );
}
