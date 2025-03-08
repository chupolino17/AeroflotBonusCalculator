import * as React from 'react';
import AppAppBar from './AppBar';
import SearchProperties from './SearchProperties';
import SearchTable from './SearchTable';

import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export function MainPage() {

  return (
    <React.Fragment>
        <AppAppBar />
        <Divider sx={{ margin: 2}}>
          <Chip label="Поиск" size="small" variant='outlined' />
        </Divider>
        <SearchProperties/>

        <Divider sx={{ margin: 4}}>
          <Chip label="Топ 5 направлений" size="small" variant='outlined' />
        </Divider>
        <SearchTable rows_len={5} is_search={false}/>
    </React.Fragment>
  );
}

export default MainPage;
