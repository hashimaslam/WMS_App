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

function SearchFilter() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
              placeholder="Search product"
              variant="outlined"
            />
            <Box mr={2}></Box>
            <Button color="primary" size="medium" variant="contained">
              Search
            </Button>
          </Box>

          {matches === false ? (
            <>
              <Typography className={classes.filterTitle}>Filters</Typography>
              <Box display="flex" className={classes.filterContainer}>
                <FormControl
                  variant="outlined"
                  size="small"
                  margin="dense"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  size="small"
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  size="small"
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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
                <div
                  role="presentation"
                  onClick={() => setOpen(false)}
                  onKeyDown={() => setOpen(false)}
                >
                  <MdsearchFilter />
                </div>
              </Drawer>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SearchFilter;
