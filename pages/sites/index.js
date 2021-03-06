import React from "react";
import MainLayout from "../../layouts/MainLayout";
import SearchFilter from "../../components/SearchFilter";
import TableGrid from "../../components/TableGrid";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";
import { API_URL, SiteView } from "../../config";
import request from "../../utils/request";

export default function Home({ data }) {
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
          <Link href="/sites/add">
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              startIcon={<PlusCircleIcon />}
            >
              Add New Site
            </Button>
          </Link>
        </Box>
        <SearchFilter
          filters={true}
          placeholder="Search Sites"
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
            {
              label: "Account Name",
              placeholder: "select",
              name: "account_name",
              items: [
                {
                  name: "Account1",
                  value: "acc1",
                },
                {
                  name: "Account2",
                  value: "acc2",
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
        <TableGrid data={data} row={rows} print={false} />
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
    name: "Site Type",
    key: "typevalue",
  },

  {
    name: "IsActive",
    key: "isactive",
  },
];

export async function getServerSideProps() {
  const data = await request(API_URL, SiteView);
  return {
    props: {
      data,
    },
  };
}
