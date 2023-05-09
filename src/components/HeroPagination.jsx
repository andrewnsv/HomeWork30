import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

const HeroTablePagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component={"div"}
      rowsPerPageOptions={[]}
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage=""
    />
  );
};

export default HeroTablePagination;
