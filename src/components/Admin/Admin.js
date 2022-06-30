import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import "./styles.css";
import MaterialReactTable from "material-react-table";

const Admin = ({ data, isLoading }) => {
  const columns = useMemo(
    () => [
      {
        header: "Name",
        id: "name",
      },
      {
        header: "Email",
        id: "email",
      },
      {
        header: "Conversations",
        id: "conv_count",
      },
      {
        header: "Messages",
        id: "msg_count",
      },
      {
        header: "Last Active",
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

  return (
    <div>
      <div className="pageTitle">
        <Typography variant="h4">Admin</Typography>
      </div>
      <div>
        <MaterialReactTable
          columns={columns}
          data={data}
          state={{
            isLoading,
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
