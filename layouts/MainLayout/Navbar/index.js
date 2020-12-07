import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListItem,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import {
  Grid as GridIcon,
  BarChart as BarChartIcon,
  Users as UsersIcon,
  ArrowDownCircle as ArrowDownIcon,
  ArrowUpCircle as ArrowUpIcon,
  Layers as SiteIcon,
  Inbox as DockinIcon,
  Package as PickingIcon,
  Navigation2 as BinningIcon,
  Truck as DispatchIcon,
  Trello as PartIcon,
  MapPin as LocationIcon,
} from "react-feather";
import NavItem from "./Navitem";

const items = [
  {
    href: "/accounts",
    icon: UsersIcon,
    title: "Accounts",
  },
  {
    href: "/",
    icon: SiteIcon,
    title: "Sites",
  },
  {
    href: "/locations",
    icon: LocationIcon,
    title: "Location",
  },
  {
    href: "/part",
    icon: PartIcon,
    title: "Part Item",
  },
];
const inbound = [
  {
    href: "/inbound/dockin",
    icon: DockinIcon,
    title: "DockIn",
  },
  {
    href: "/inbound/binning",
    icon: BinningIcon,
    title: "Binning",
  },
];
const outbound = [
  {
    href: "/outbound/picking",
    icon: PickingIcon,
    title: "Picking",
  },
  // {
  //   href: "/outbound/dispatch",
  //   icon: DispatchIcon,
  //   title: "Dispatch",
  // },
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
    zIndex: 100,
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const router = useRouter();
  const [masterOpen, setMasterOpen] = React.useState(true);
  const [inboundOpen, setInboundOpen] = React.useState(true);
  const [outboundOpen, setOutboundOpen] = React.useState(true);
  // const handleClick = () => {
  //   setOpen(!open);
  // };
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const content = (
    <Box
      className={classes.navbar}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box p={2}>
        <List>
          <ListItem
            disableGutters
            button
            onClick={() => setMasterOpen(!masterOpen)}
            className={classes.button}
          >
            <GridIcon className={classes.icon} size="20" />
            <span className={classes.title}>Master</span>
            {masterOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={masterOpen} timeout="auto" unmountOnExit>
            {items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </Collapse>
          <ListItem
            disableGutters
            button
            onClick={() => setInboundOpen(!inboundOpen)}
            className={classes.button}
          >
            <ArrowDownIcon className={classes.icon} size="20" />
            <span className={classes.title}>Inbound</span>
            {inboundOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={inboundOpen} timeout="auto" unmountOnExit>
            {inbound.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </Collapse>
          <ListItem
            disableGutters
            button
            onClick={() => setOutboundOpen(!outboundOpen)}
            className={classes.button}
          >
            <ArrowUpIcon className={classes.icon} size="20" />
            <span className={classes.title}>Outbound</span>
            {outboundOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={outboundOpen} timeout="auto" unmountOnExit>
            {outbound.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </Collapse>
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
