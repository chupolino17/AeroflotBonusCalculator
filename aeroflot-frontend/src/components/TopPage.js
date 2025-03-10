import * as React from 'react';
import AppAppBar from './AppBar';
import SearchTable from './SearchTable';

import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export function TopPage() {

  return (
    <React.Fragment>
        <AppAppBar />
        <Divider sx={{ margin: 4}}>
          <Chip label="Топ направлений" size="small" variant='outlined' />
        </Divider>
        <SearchTable rows_len={100000} is_search={false}/>
    </React.Fragment>
  );
}

export default TopPage;
