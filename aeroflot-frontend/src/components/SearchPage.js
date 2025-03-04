import * as React from 'react';
import AppAppBar from './AppBar';
import SearchProperties from './SearchProperties';
import FlightsTable from './GroupTable';

export function SearchPage() {

  return (
    <React.Fragment>
        <AppAppBar />
        <SearchProperties/>
        <FlightsTable rows_len={100000} is_search={true}/>
    </React.Fragment>
  );
}


export default SearchPage;
