import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import "./styles.css";
import { useTable, usePagination } from "react-table";

const Admin = ({ data, isLoading, pageCount, pagination, setPagination }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Conversations",
        accessor: "conv_count",
      },
      {
        Header: "Messages",
        accessor: "msg_count",
        id: "msg_count",
      },
      {
        Header: "Last Active",
        id: "last_activity",
        accessor: "last_activity",
        id: "last_activity",
        Cell: ({ cell }) => {
          return (
            <Typography variant="body2">
              {cell.row.original.last_activity
                ? new Date(cell.row.original.last_activity).toLocaleString(
                    "en-US"
                  )
                : "Not Active"}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <div className="pageTitle">
        <Typography variant="h4">Admin</Typography>
      </div>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Admin;
