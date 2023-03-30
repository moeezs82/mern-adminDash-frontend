import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getCustomers } from "actions/userAction";
import Header from "components/Layout/include/Header";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Customers = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { loading, customers } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
      }
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subTitle="See your list of customers" />
      <Box mt="40px" height="80vh"
        sx={{
          "& .MuiDataGrid-root" :{
            border: "none",
          },
          "& .MuiDataGrid-cell" :{
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders" :{
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller":{
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer":{
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color: `${theme.palette.secondary[200]} !important`,
          }

        }}
      >
        <DataGrid
          loading={loading}
          getRowId={(row) => row._id}
          rows={customers || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
