import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    zIndex: 1000,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  icons: {
    color: theme.palette.textGrey.primary,
  },
  menuIcon: {
    color: theme.palette.textGrey.primary,
    border: `1px solid ${theme.palette.textGrey.primary}`,
    borderRadius: 5,
    padding: "8px 8px",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={2} {...rest}>
      <Toolbar>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton className={classes.icons}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.icons}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton className={classes.menuIcon} onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
