import { Typography } from "@mui/material";

const column_arr = [
    {
      Header: "Name",
      accessor: "name",
      filter: "fuzzyText",
    },
    {
      Header: "Email",
      accessor: "email",
      filter: "fuzzyText",
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
]

export default column_arr;