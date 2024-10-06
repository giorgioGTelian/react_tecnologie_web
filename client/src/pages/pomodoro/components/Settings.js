import React from "react";
import { useNavigate } from 'react-router-dom';
import Input from "./Input";
import Modal from "./Modal";
import ButtonPomodoro from "./ButtonPomodoro";
import { useDispatch, useSelector } from "react-redux";
import {
  setLongBreakInterval,
  toggleAutoBreaks,
  toggleAutoPomodoros,
  updateModeTime,
} from "../../../state/timerSlice";
import { ToggleButton, Typography, Box } from "@mui/material";


const Item = ({ children, col }) => (
  <div>{children}</div>
);

const Label = ({ children }) => (
  <label>{children}</label>
);

export default function Settings() {
  const navigate = useNavigate();
  const back = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  const {
    modes,
    autoBreaks,
    autoPomodoros,
    longBreakInterval,
  } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  return (
    <Modal>
      <Box component="section" sx={{ p: 2 }}>
          <Typography variant="h2">Timer Settings</Typography>
          <div>
            <Item col>
              <Label>Time (minutes)</Label>
              <div >
                {Object.values(modes).map(({ id, label, time }) => (
                  <Input
                    key={id}
                    onChange={(e) => {
                      dispatch(
                        updateModeTime({ mode: id, time: e.target.value })
                      );
                    }}
                    min={1}
                    label={label}
                    type="number"
                    value={time}
                  />
                ))}
              </div>
            </Item>
            <Box component="section" >
            <Typography variant="h6">Auto start Breaks?</Typography>
              <ToggleButton
                value="check"
                on={autoBreaks}
                onClick={() => dispatch(toggleAutoBreaks())}
              >
                {autoBreaks ? "On" : "Off"}
              </ToggleButton>
            </Box>
            <Box component="section">
            <Typography variant="h6">Auto start Pomodoros?</Typography>
              <ToggleButton
                value="check"
                on={autoPomodoros}
                onClick={() => dispatch(toggleAutoPomodoros())}
              >
                {autoPomodoros ? "On" : "Off"}
              </ToggleButton>
            </Box>
            <Box component="section">
            <Typography variant="h6">Long Break interval</Typography>
              <Input
                min={1}
                type="number"
                value={longBreakInterval}
                onChange={(e) => dispatch(setLongBreakInterval(e.target.value))}
              />
            </Box>
          </div>
          <Box component="section" sx={{ p: 2, alignContent: "center" }} >
          <ButtonPomodoro onClick={back}>OK</ButtonPomodoro>
          </Box>
        </Box>
    </Modal>
  );
}
