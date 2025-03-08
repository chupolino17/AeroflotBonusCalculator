import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { purple } from '@mui/material/colors';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import AirportChoose from './DestinationChoose';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { DateTime } from "luxon";

import { styled, alpha } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { setDateFrom, setNeedSearch, setFareClass } from "../slices/searchSlice";

// const ColorButton = styled(Button)(({ theme }) => ({
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     '&:hover': {
//       backgroundColor: purple[700],
//     },
//   }));


export function SearchProperties() {
    var customParseFormat = require("dayjs/plugin/customParseFormat");
    dayjs.extend(customParseFormat)

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const {datetime_from, code_from, code_to, fare_class, need_search} = useSelector((state) => {
        return state.ticket.searchState;
      })

return (
    <React.Fragment>
        <Container maxWidth="lg">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
            container spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid size={2}></Grid>
            <Grid size={4}>
            <Stack spacing={1}>
                <div>Откуда</div>
                <AirportChoose label='Откуда' is_from={true}/>
            </Stack>
            </Grid>
            <Grid size={4}>
                <Stack spacing={1}>
                    <div>Куда</div>
                    <AirportChoose label='Куда' is_from={false}/>
                </Stack>
            </Grid>
            <Grid size={2}></Grid>

            <Grid size={2}></Grid>
            <Grid size={4}>
                <Stack spacing={1}>
                    <div>Когда туда</div>
                    <DatePicker
                        value={dayjs(datetime_from, 'DDMMYYYY')}
                        onChange={(newValue) => {
                            dispatch(setDateFrom(newValue.format('DDMMYYYY')))
                            console.log(newValue.format('DDMMYYYY'))
                        }}
                        format="DD MMM YYYY"
                    />
                </Stack>
            </Grid>
            <Grid size={2.9}>
                <Stack spacing={1}>
                    <div>Класс</div>
                    <ButtonGroup aria-label="Basic button group">
                        <Button
                            variant={fare_class === "business" ? "outlined" : "contained"}
                            onClick={() => dispatch(setFareClass('economy'))}
                        >Эконом
                        </Button>
                        <Button
                            variant={fare_class === "business" ? "contained" : "outlined"}
                            onClick={() => dispatch(setFareClass('business'))}
                        >Бизнес</Button>
                    </ButtonGroup>
                </Stack>
            </Grid>
            <Grid size={1.1}>
                <Button variant='contained' onClick={() => {
                    dispatch(setNeedSearch(true))
                    navigate("/search");
                }}>Поиск</Button>
            </Grid>

            <Grid size={2}></Grid>
        </Grid>
        </ LocalizationProvider>
        </Container>

    </React.Fragment>
)

}

export default SearchProperties;