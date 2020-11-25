import React from "react";
import Link from "next/link";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, ListItem, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,

    paddingLeft: theme.spacing(4),
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
    "&:hover": {
      backgroundColor: "#cbc8e3",
      color: "#3523c2",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    height: "22px",
    width: "22px",
    color: theme.palette.text.secondary,
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

const NavItem = ({ className, href, icon: Icon, title, ...rest }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        {...rest}
      >
        <Link href={href} passHref>
          <Button
            className={
              router.pathname === href
                ? clsx(classes.button, classes.active)
                : classes.button
            }
            // component={Link}
            // component={<Link href={href} />}
            // to={href}
          >
            {Icon && <Icon className={classes.icon} size="20" />}
            <span className={classes.title}>{title}</span>
          </Button>
        </Link>
      </ListItem>
    </>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
