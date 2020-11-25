import { useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import MainLayout from "../layouts/MainLayout";
import SearchFilter from "../modules/sites/components/SearchFilter";
import SiteTable from "../modules/sites/components/SiteTable";
import data from "../modules/sites/data";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";
import BarcodePrint from "../components/BarcodePrint";

import { useBarcode } from "react-barcodes";
export default function Home() {
  const componentRef = useRef();
  const { inputRef } = useBarcode({
    value: "12345 6789",
  });
  return (
    <MainLayout>
      <Box m={3}>
        <Box mb={3} display="flex" justifyContent="flex-end">
          <Link href="/sites/add">
            <Button
              color="primary"
              size="medium"
              variant="contained"
              startIcon={<PlusCircleIcon />}
            >
              Add New Site
            </Button>
          </Link>
        </Box>
        <SearchFilter filters={true} />
        <Box mt={3} />
        <SiteTable customers={data} componentRef={componentRef} print={true} />
        <Box mt={3} className="printComponent">
          <BarcodePrint
            ref={componentRef}
            value="sample12"
            barcode={inputRef}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}
