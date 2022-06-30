import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import "./styles.css";
import MaterialReactTable from "material-react-table";

const Admin = () => {
  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setRemoteData(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        name: userData.name,
        conversations: userData.username,
        email: userData.email,
        messages: userData.address.street,
        lastActive: userData.address.zipcode,
      })) ?? [],
    [remoteData]
  );

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
        id: "conversations",
      },
      {
        header: "Messages",
        id: "messages",
      },
      {
        header: "Last Active",
        id: "lastActive",
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
          data={parsedData}
          state={{
            isLoading,
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
