import React, { useEffect, useMemo, useState, useRef } from "react";


// TODO
// when last flag is recieved, trigger table reload

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Container } from "@mui/material";


const rows = [
  { id: 1,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 2,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 3,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 4,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 5,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 6,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 7,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  },
  { id: 8,
    from: "Москва (SVO)",
    to: "Москва (VKO)",
    date_from: "2025-12-14 17:50",
    date_to: "2025-12-14 19:50",
    price: 12345,
    milles: 1000,
    miles_rate: 17.35
  }
]

export function FlightsTable(props) {

  const columns = useMemo(
    () => [
      {
        accessorKey: "from",
        header: "Откуда",
      },
      {
        accessorKey: "to",
        header: "Куда",
      },
      {
        accessorKey: "date_from",
        header: "Отправление",
      },
      {
        accessorKey: "date_to",
        header: "Прибытие",
      },
      {
        accessorKey: "price",
        header: "Стоимость",
      },
      {
        accessorKey: "milles",
        header: "Мили",
      },
      {
        accessorKey: "miles_rate",
        header: "Стомоисть мили",
      },
    ],
    []
  );

  const [tickets, setTickets] = useState();

  const fetchTickets = async() =>{
    try {
        const response = await fetch(
            `${API_SERVER}/search/search/datefrom=${date_from}&name_from=${code_from}&name_to=${code_to}&class=economy`
        );
        const json = await response.json();
        console.log(json)
        fetchTickets(json.map(ticket => ({label:`${airport.name} (${airport.code})`, code: airport.code})));
    } catch (e) {
        console.error(e);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);


  const table = useMaterialReactTable({
    columns,
    data: rows.slice(0, props.rows_len),
    enableGrouping: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    groupedColumnMode: "remove",
    initialState: {
      grouping: ["from"],
    },
    autoResetPageIndex: false,
    muiFilterTextFieldProps: {color: 'secondary'},
    enableBottomToolbar: false,
  });

  return (
  <React.Fragment>
    <Container maxWidth="lg">
     <MaterialReactTable table={table}/>
    </Container>
   </React.Fragment>
  );
};

export default FlightsTable;