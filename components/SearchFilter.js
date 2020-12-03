import React from "react";

import {
  Box,
  Button,
  Card,
  List,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Drawer,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Search as SearchIcon, Filter as FilterIcon } from "react-feather";
import MdsearchFilter from "./MdsearchFilter";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
  },
  filterContainer: {
    width: "100%",
  },
  formControl: {
    minWidth: 200,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  filterTitle: {
    fontSize: "20px",
    fontWeight: 500,
    marginTop: theme.spacing(2) + 2,
    textTransform: "uppercase",
  },
}));

function SearchFilter({
  filters,
  placeholder,
  filterValues,
  handleChange,
  handleApply,
  open,
  setOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
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
              placeholder={placeholder}
              variant="outlined"
            />
            <Box mr={2}></Box>
            <Button color="primary" size="medium" variant="contained">
              Search
            </Button>
          </Box>

          {filters === true ? (
            matches === false ? (
              <>
                <Typography className={classes.filterTitle}>Filters</Typography>
                <Box display="flex" className={classes.filterContainer}>
                  {filterValues.map((i, index) => {
                    return (
                      <FormControl
                        variant="outlined"
                        size="small"
                        margin="dense"
                        className={classes.formControl}
                        key={index}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          {i.label}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          placeholder={i.placeholder}
                          onChange={handleChange}
                          label={i.label}
                          name={i.name}
                        >
                          {i.items.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.value}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    );
                  })}
                </Box>
              </>
            ) : (
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  onClick={() => setOpen(true)}
                  startIcon={<FilterIcon size={15} />}
                  variant="outlined"
                  color="primary"
                >
                  Filters
                </Button>
                <Drawer
                  anchor="bottom"
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <div role="presentation">
                    <MdsearchFilter
                      handleApply={handleApply}
                      handleChange={handleChange}
                      filterValues={filterValues}
                    />
                  </div>
                </Drawer>
              </Box>
            )
          ) : (
            ""
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SearchFilter;
