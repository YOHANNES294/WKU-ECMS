import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useState, useMemo, useEffect } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Table = ({
  columns,
  rows,
  setSelectedRows,
  handleApproveAll,
  clickableColumns,
}) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
 // const [filteredRows, setFilteredRows] = useState(rows);

  const theme = createTheme({
    typography: {
      fontFamily: "Satoshi",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
       @font-face {
  font-family: "Satoshi";
  src: url("../../app/fonts/Satoshi-Regular.woff2") format("woff2")
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}
      `,
      },
    },
  });



  if (!clickableColumns) {
    clickableColumns = [-1];
  }

  const selectedRowsData = useMemo(
    () => rows.filter((row) => rowSelectionModel.includes(row._id)),
    [rowSelectionModel, rows]
  );

  useEffect(() => {
    setSelectedRows(selectedRowsData);
  }, [selectedRowsData, setSelectedRows]);

  const handleClick = (params) => {
    // Access the correct field for the Base64-encoded image data
    const imageData = params.row.attachedFile; // Assuming the Base64-encoded image data is stored in a field named "attachedFile"

    // Create a new window to display the image
    const newWindow = window.open();

    // Set the document content to display the image
    newWindow.document.write(`<img src="${imageData}" />`);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        style={{ height: 520, width: "100%" }}
        sx={{
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: "#5e35b1",

            //backgroundColor: "#34e1eb",
          },
          "& .MuiCheckbox-root": {
            color: "#5f62fa",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns.map((column, index) => ({
            ...column,
            renderCell: (params) => (
              <div
                style={{
                  cursor: clickableColumns.includes(index) ? "pointer" : "auto",
                  paddingLeft: clickableColumns.includes(index)
                    ? "20px"
                    : "0px",
                }}
                onClick={() => handleClick(params, params.id)}
              >
                {clickableColumns.includes(index) && params.value ? (
                  <OpenInNewIcon />
                ) : (
                  params.value
                )}
              </div>
            ),
          }))}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          className="dark:bg-gray-800   dark:text-gray "
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
          rowSelectionModel={rowSelectionModel}
          sx={{ fontFamily: "Satoshi", fontSize: "15px", color: "#5e35b1" }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Table;
