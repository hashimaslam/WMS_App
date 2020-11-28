import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Search as SearchIcon, Filter as FilterIcon } from "react-feather";
import TableGrid from "../../components/TableGrid";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Link,
} from "@material-ui/core";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
  },
}));
export default function InboundBinning() {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const requests = state.inBound.requests;

  return (
    <>
      <MainLayout>
        <Box m={3}>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <Box>
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    margin="dense"
                    placeholder="Search product"
                    variant="outlined"
                  />
                  <Box mr={2}></Box>
                  <Link href="/inbound/binScan">
                    <Button color="primary" size="medium" variant="contained">
                      Scan
                    </Button>
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box m={3}>
          <TableGrid data={requests} row={rows} />
        </Box>
      </MainLayout>
    </>
  );
}

const rows = [
  {
    name: "Destination Site",
    key: "destination_site",
  },
  {
    name: "Invoice No",
    key: "invoice_no",
  },
  {
    name: "Reference",
    key: "reference_1",
  },
  {
    name: "Part No",
    key: "part_no",
  },
  {
    name: "Stock Type",
    key: "stock_type",
  },
  {
    name: "Quantity",
    key: "quantity",
  },
];
