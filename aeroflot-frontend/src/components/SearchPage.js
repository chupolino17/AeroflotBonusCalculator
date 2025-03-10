import * as React from "react";
import AppAppBar from "./AppBar";
import SearchProperties from "./SearchProperties";
import SearchTable from "./SearchTable";

import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

export function SearchPage() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Divider sx={{ margin: 2 }}>
        <Chip label="Поиск" size="small" variant="outlined" />
      </Divider>
      <SearchProperties />
      <Divider sx={{ margin: 4 }}>
        <Chip label="Результаты поиска" size="small" variant="outlined" />
      </Divider>
      <SearchTable is_search={true} />
    </React.Fragment>
  );
}

export default SearchPage;
