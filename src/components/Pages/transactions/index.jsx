import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getTransactions } from "actions/transactionAction";
import Header from "components/Layout/include/Header";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGridCustomToolbar from "./DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  //values to sent to the backend
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  // const [searchInput, setSearchInput] = useState("")

  const { loading, transactions, total } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    let { page, pageSize } = paginationModel;
    dispatch(
      getTransactions({ page, pageSize, sort: JSON.stringify(sort), search })
    );
  }, [dispatch, paginationModel, sort, search]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => params.value.email,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subTitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={loading}
          getRowId={(row) => row._id}
          rows={transactions || []}
          columns={columns}
          rowCount={total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={(newPaginationModel) =>
            setPaginationModel(newPaginationModel)
          }
          pageSizeOptions={[20, 40, 100]}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: {
              // searchInput,
              // setSearchInput,
              search,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
