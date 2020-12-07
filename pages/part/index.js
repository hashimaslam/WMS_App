import React, { useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import SearchFilter from "../../components/SearchFilter";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Box, Button } from "@material-ui/core";
import { API_URL } from "../../config";
import request from "../../utils/request";
import TableGrid from "../../components/TableGrid";
import Link from "next/link";

export default function Part({ data }) {
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
          <Link href="/part/add">
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              startIcon={<PlusCircleIcon />}
            >
              Add New Part
            </Button>
          </Link>
        </Box>
        <SearchFilter
          filters={true}
          placeholder="Search Part"
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
    name: "Part Code",
    key: "partnumber",
  },
  {
    name: "Part Name",
    key: "partname",
  },

  {
    name: "Part Type",
    key: "typevalue",
  },
  {
    name: "IsActive",
    key: "isactive",
  },
];

export async function getServerSideProps() {
  const data = await request(API_URL, {
    type: "part",
    action: "view",
  });
  return {
    props: {
      data,
    },
  };
}
