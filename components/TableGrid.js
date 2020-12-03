import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  withStyles,
} from "@material-ui/core";

import PrintModal from "./PrintModal";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "scroll",
    "-webkit-overflow-scrolling": "touch",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  printComp: {
    display: "none",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableGrid = ({ className, data, row, barcodeKey, print, ...rest }) => {
  const classes = useStyles();
  const [selectedDataIds, setSelectedDataIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDataIds;

    if (event.target.checked) {
      newSelectedDataIds = data.map((item) => item.id);
    } else {
      newSelectedDataIds = [];
    }

    setSelectedDataIds(newSelectedDataIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDataIds.indexOf(id);
    let newSelectedDataIds = [];

    if (selectedIndex === -1) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(1));
    } else if (selectedIndex === selectedDataIds.length - 1) {
      newSelectedDataIds = newSelectedDataIds.concat(
        selectedDataIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDataIds = newSelectedDataIds.concat(
        selectedDataIds.slice(0, selectedIndex),
        selectedDataIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDataIds(newSelectedDataIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {/* <PerfectScrollbar> */}
      <Box minWidth={1050}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedDataIds.length === data.length}
                  color="primary"
                  indeterminate={
                    selectedDataIds.length > 0 &&
                    selectedDataIds.length < data.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell> */}
              {row.map((i) => {
                return <StyledTableCell>{i.name}</StyledTableCell>;
              })}
              {print && <StyledTableCell>Actions</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, limit).map((item, index) => {
              return (
                <>
                  <StyledTableRow
                    hover
                    key={index}
                    // selected={selectedDataIds.indexOf(item.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDataIds.indexOf(item.id) !== -1}
                    onChange={(event) => handleSelectOne(event, item.id)}
                    value="true"
                  />
                </TableCell> */}
                    {row.map((i) => {
                      if (i.name === "Quantity") {
                        return (
                          <StyledTableCell>
                            {item.scannedquantity}/{item.requestquantity}
                          </StyledTableCell>
                        );
                      } else {
                        return (
                          <StyledTableCell>
                            {item[i.key].toString()}
                          </StyledTableCell>
                        );
                      }
                    })}
                    {print && (
                      <StyledTableCell>
                        <PrintModal
                          value={
                            Array.isArray(item[barcodeKey])
                              ? [...item[barcodeKey]]
                              : [item[barcodeKey]]
                          }
                        />
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {/* </PerfectScrollbar> */}
      <TablePagination
        component="div"
        count={data.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default TableGrid;
