import * as React from 'react';
import AppAppBar from './AppBar';
import FlightsTable from './GroupTable';

export function TopPage() {

  return (
    <React.Fragment>
        <AppAppBar />
        <FlightsTable rows_len={100000} is_search={false}/>
    </React.Fragment>
  );
}


export default TopPage;
