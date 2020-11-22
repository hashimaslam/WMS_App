import Head from "next/head";
import styles from "../../styles/Home.module.css";
import MainLayout from "../../layouts/MainLayout";
import SearchFilter from "../../modules/sites/components/SearchFilter";
import SiteTable from "../../modules/sites/components/SiteTable";
import data from "../../modules/sites/data";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";
export default function Accounts() {
  return (
    <MainLayout>
      <Box m={3}>
        <Box mb={3} display="flex" justifyContent="flex-end">
          <Link href="/accounts/add">
            <Button
              color="primary"
              size="medium"
              variant="contained"
              startIcon={<PlusCircleIcon />}
            >
              Add New Account
            </Button>
          </Link>
        </Box>
        <SearchFilter />
        <Box mt={3} />
        <SiteTable customers={data} />
      </Box>
    </MainLayout>
  );
}
