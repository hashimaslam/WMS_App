import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useReactToPrint } from "react-to-print";
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
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

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

const TableGrid = ({ className, data, row, ...rest }) => {
  const classes = useStyles();
  const [selectedDataIds, setSelectedDataIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  useEffect(() => {
    console.log(row);
  }, [row]);
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
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedDataIds.length === data.length}
                  color="primary"
                  indeterminate={
                    selectedDataIds.length > 0 &&
                    selectedDataIds.length < data.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              {row.map((i) => {
                return <TableCell>{i.name}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, limit).map((item, index) => (
              <TableRow
                hover
                key={item.id}
                selected={selectedDataIds.indexOf(item.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDataIds.indexOf(item.id) !== -1}
                    onChange={(event) => handleSelectOne(event, item.id)}
                    value="true"
                  />
                </TableCell>
                {row.map((i) => {
                  return <TableCell>{item[i.key]}</TableCell>;
                })}
              </TableRow>
            ))}
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

// SiteTable.propTypes = {
//   className: PropTypes.string,
//   data: PropTypes.array.isRequired,
// };

export default TableGrid;
