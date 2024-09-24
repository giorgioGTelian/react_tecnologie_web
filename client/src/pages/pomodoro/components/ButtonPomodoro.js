import React from "react";
import Icon from "./Icon";
import { Button } from "@mui/material";

const ButtonPomodoro = ({ children, onClick, icon }) => (
  <Button variant="contained" onClick={onClick}>
    {!!icon && <Icon name={icon} />}
    {children}
  </Button>
);

export default ButtonPomodoro;
