import React from "react";
import MainLayout from "../../layouts/MainLayout";
import SearchFilter from "../../components/SearchFilter";

import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";
import TableGrid from "../../components/TableGrid";
import { API_URL } from "../../config";
import request from "../../utils/request";
export default function Accounts({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
  };
  const handleApply = () => {
    setOpen(false);
    console.log("clicked");
  };
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
        <SearchFilter
          filters={true}
          placeholder="Search Accounts"
          filterValues={[
            {
              label: "Is Active",
              placeholder: "select",
              name: "isactive",
              items: [
                {
                  name: "Active",
                  value: "true",
                },
                {
                  name: "In Active",
                  value: "false",
                },
              ],
            },
          ]}
          handleChange={handleChange}
          handleApply={handleApply}
          open={open}
          setOpen={setOpen}
        />
        <Box mt={3} />
        <TableGrid data={data} row={rows} />
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
    name: "Parent Account Type",
    key: "parentaccountname",
  },
  {
    name: "Is Active",
    key: "isactive",
  },
];

export async function getServerSideProps() {
  const data = await request(API_URL, {
    type: "account",
    action: "view",
  });
  return {
    props: {
      data,
    },
  };
}
