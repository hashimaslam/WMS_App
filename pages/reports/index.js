import { Box } from "@material-ui/core";
import MainLayout from "../../layouts/MainLayout";
import { API_URL, ReportView } from "../../config";
import request from "../../utils/request";
import TableGrid from "../../components/TableGrid";
export default function reports({ data }) {
  return (
    <MainLayout>
      <Box m={3}>
        <TableGrid data={data} row={rows} print={false} />
      </Box>
    </MainLayout>
  );
}

const rows = [
  {
    name: "Part Name",
    key: "partname",
  },

  {
    name: "Part Number",
    key: "partnumber",
  },
  {
    name: "Stock Type",
    key: "stocktype",
  },
  {
    name: "Stock Quantity",
    key: "stocktquantity",
  },
  {
    name: "LPN",
    key: "barcode",
  },
  {
    name: "Binned Date",
    key: "date",
  },
];

export async function getServerSideProps() {
  const data = await request(API_URL, ReportView);
  return {
    props: {
      data,
    },
  };
}
