import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";

import { useDispatch, useSelector } from "react-redux";

import { setIsProfileOpened, setEmailPeriod, setIsSubscriber } from "../slices/authSlice";

export default function Profile() {
  const dispatch = useDispatch();

  const { isProfileOpened } = useSelector((state) => {
    return state.auth;
  });

  const { email, username, email_period, is_subscriber, date_joined } =
    useSelector((state) => {
      return state.auth.user;
    });

  const handleChangeSubscriber = (event) => {
    dispatch(setIsSubscriber(event.target.checked));
  };

  const handleChangePeriod = (event) => {
    dispatch(setEmailPeriod(event.target.value));
  };

  console.log(email_period);

  return (
    <React.Fragment>
      <Dialog open={isProfileOpened}>
        <DialogTitle>Профиль</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ваш логин: @{username}
            <br />
            Ваш email: <a href={`mailto:${email}`}>{email}</a>
            <br />
            <br />
          </DialogContentText>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={is_subscriber}
                  onChange={handleChangeSubscriber}
                />
              }
              label="Хочу получать топ направлений"
            />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Периодичность рассылки
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={email_period}
                label="Периодичность рассылки"
                onChange={handleChangePeriod}
                disabled={!is_subscriber}
              >
                <MenuItem value={1}>Раз в час</MenuItem>
                <MenuItem value={24}>Раз в день</MenuItem>
                <MenuItem value={168}>Раз в неделю</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <DialogContentText>
            <br />
            Вы с нами с {date_joined}
            <br />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => dispatch(setIsProfileOpened(false))}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
