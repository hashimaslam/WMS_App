import MainLayout from "../../layouts/MainLayout";
import SearchFilter from "../../modules/sites/components/SearchFilter";
import SiteTable from "../../modules/sites/components/SiteTable";
import data from "../../modules/sites/data";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";

export default function InboundDockin() {
  return (
    <MainLayout>
      <Box m={3}>
        <Box mb={3} display="flex" justifyContent="flex-end">
          <Link href="/inbound/create">
            <Button
              color="primary"
              size="medium"
              variant="contained"
              startIcon={<PlusCircleIcon />}
            >
              Create Request
            </Button>
          </Link>
        </Box>
        <SearchFilter filters={false} />
        <Box mt={3} />
        <SiteTable customers={data} print={false} />
      </Box>
    </MainLayout>
  );
}
