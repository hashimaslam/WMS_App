import MainLayout from "../../layouts/MainLayout";
import SearchFilter from "../../components/SearchFilter";
import TableGrid from "../../components/TableGrid";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";
import { API_URL } from "../../config";
import request from "../../utils/request";

export default function InboundDockin({ data }) {
  return (
    <MainLayout>
      <Box m={3}>
        <Box mb={3} display="flex" justifyContent="flex-end">
          <Link href="/inbound/create">
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              startIcon={<PlusCircleIcon />}
            >
              Create Request
            </Button>
          </Link>
        </Box>
        <SearchFilter filters={false} />
        <Box mt={3} />
        <TableGrid data={data} row={rows} print={true} barcodeKey={"barcode"} />
      </Box>
    </MainLayout>
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
  const data = await request(API_URL, {
    type: "inbound",
    action: "gridview",
  });
  return {
    props: {
      data,
    },
  };
}
