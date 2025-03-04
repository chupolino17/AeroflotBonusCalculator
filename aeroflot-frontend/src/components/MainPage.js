import * as React from 'react';
import AppAppBar from './AppBar';
import SearchProperties from './SearchProperties';
import FlightsTable from './GroupTable';

export function MainPage() {

  return (
    <React.Fragment>
        <AppAppBar />
        <SearchProperties/>
        <FlightsTable rows_len={5} is_search={false}/>
    </React.Fragment>
  );
}

export default MainPage;
