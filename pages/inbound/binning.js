import MainLayout from "../../layouts/MainLayout";
import { Search as SearchIcon } from "react-feather";
import TableGrid from "../../components/TableGrid";
import { API_URL, InboundView } from "../../config";
import request from "../../utils/request";
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
export default function InboundBinning({ data }) {
  const classes = useStyles();

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
                    <Button color="primary" size="medium" variant="outlined">
                      Scan
                    </Button>
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box m={3}>
          <TableGrid
            data={data}
            row={rows}
            print={true}
            barcodeKey={"barcode"}
          />
        </Box>
      </MainLayout>
    </>
  );
}
const rows = [
  {
    name: "Account Name",
    key: "accountname",
  },
  {
    name: "Site Code",
    key: "sitecode",
  },
  {
    name: "Site Name",
    key: "sitename",
  },
  {
    name: "Invoice Number",
    key: "documentnumber",
  },
  // {
  //   name: "Internal ID",
  //   key: "referenceid",
  // },
  {
    name: "Part Number",
    key: "partnumber",
  },
  {
    name: "Stock Type",
    key: "stocktype",
  },
  {
    name: "Quantity",
    key: "requestquantity",
  },
];

export async function getServerSideProps() {
  const data = await request(API_URL, InboundView);
  return {
    props: {
      data,
    },
  };
}
