import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from 'react-redux'

import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Container } from "@mui/material";

import {API_SERVER, apiClient} from '../service/config'
import { setNeedSearch } from "../slices/searchSlice";


export function SearchTable(props) {

  const columns = useMemo(
    () => [
      {
        accessorKey: "name_from",
        header: "Откуда",
      },
      {
        accessorKey: "name_to",
        header: "Куда",
      },
      {
        accessorKey: "datetime_from",
        header: "Отправление",
      },
      {
        accessorKey: "datetime_to",
        header: "Прибытие",
      },
      {
        accessorKey: "flight_no",
        header: "Номер рейса",
      },
      {
        accessorKey: "airline_name",
        header: "Авиакомпания",
      },
      {
        accessorKey: "fare",
        header: "Тариф",
      },
      {
        accessorKey: "price",
        header: "Стоимость",
      },
      {
        accessorKey: "miles_price",
        header: "Мили",
      },
      {
        accessorKey: "miles_rate",
        header: "Стомоисть мили",
      },
    ],
    []
  );

  const dispatch = useDispatch()
  const tickets = useSelector((state) => {
    return state.ticket.lastSearchList;
  });

  const {datetime_from, code_from, code_to, fare_class, need_search} = useSelector((state) => {
    return state.ticket.searchState;
  })

  const [is_loading, isLoading] = React.useState(false)
  const [is_top_loaded, isTopLoaded] = React.useState(false)

  const [segments_state, setSegmentsState] = React.useState([])
  const [all_tickets_state, setAllTicketsState] = React.useState([])

  const parseTickets = async(tickets) =>{
    var segments = [];
    var all_tickets = [];
    var counter = 0;
    tickets.forEach(function(item) {
        let miles_sum = 0
        let needLegs = item['legs'].length > 1

        let ticket_row = Object.assign({}, item);

        ticket_row['ticket_id'] = counter

        item['legs'].forEach(function(leg) {
            let leg_row = Object.assign({}, leg);
            if (leg['miles'] !== null) {
                leg_row['miles_price'] = leg['miles']['miles_price']
                miles_sum += leg['miles']['miles_price']
            }
            leg_row['manager_id'] = ticket_row['ticket_id']
            if (needLegs) {
                segments.push(leg_row)
            } else {
                ticket_row['flight_no'] = leg['flight_no']
                ticket_row['airline_name'] = leg['airline_name']
            }
        })

        if (miles_sum) {
            ticket_row['miles_price'] = miles_sum
            ticket_row['miles_rate'] = ticket_row['price'] / miles_sum
        }
        ticket_row['price'] = ticket_row['price'] + ' руб.'
        all_tickets.push(ticket_row)

        counter++
    });
    setSegmentsState(segments)
    setAllTicketsState(all_tickets)
  }


    const fetchTickets = async() =>{
        try {
            isLoading(true)
            let request = ''
            if (props.is_search) {
                request = `${API_SERVER}/search/search?datefrom=${datetime_from}&code_from=${code_from}&code_to=${code_to}&class=${fare_class}`
                dispatch(setNeedSearch(false))
            } else {
                request = `${API_SERVER}/search/top?length=${props.rows_len}`
                isTopLoaded(true)
            }
            const response = await fetch(request)
            const tickets = await response.json()

            parseTickets(tickets)
            isLoading(false)
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (need_search || (props.is_search === false && !is_top_loaded) ) {
            fetchTickets();
        }
    }, [need_search, is_top_loaded]);

  const table = useMaterialReactTable({
    columns,
    data: all_tickets_state,
    enableExpanding: true,
    initialState: { expanded: true },
    getSubRows: (row) => segments_state.filter((r) => r['manager_id'] === row['ticket_id']),
    state: {
        isLoading: is_loading,
        density: 'compact',
        pagination: {
            pageIndex: 0,
            pageSize: 100,
          },
    },
    muiFilterTextFieldProps: {color: 'secondary'},
    enableBottomToolbar: false,
    enableTopToolbar: false,
    muiTableBodyRowProps: ({ row }) => ({
        sx: {
          backgroundColor: row.original.price ? 'white' : '#EDDAD6',
        },
      }),


  });

  return (
  <React.Fragment>
    <Container maxWidth="lg">
     <MaterialReactTable table={table}/>
    </Container>
   </React.Fragment>
  );
};

export default SearchTable;