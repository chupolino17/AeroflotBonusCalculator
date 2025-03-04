import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import AirportChoose from './DestinationChoose';


export function SearchProperties() {

    const [date_from, dateFrom] = React.useState(dayjs());
    const [date_to, dateTo] = React.useState(dayjs());

return (
    <React.Fragment>
        <Container maxWidth="lg">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AirportChoose label='Откуда'/>
            <AirportChoose label='Куда'/>
                <DatePicker
                    label="Туда"
                    value={date_from}
                    onChange={(newValue) => dateFrom(newValue)}
                />
                <DatePicker
                    label="Обратно"
                    value={date_to}
                    onChange={(newValue) => dateTo(newValue)}
                />
            <Button>Поиск</Button>
        </ LocalizationProvider>
        </Container>

    </React.Fragment>
)

}

export default SearchProperties;