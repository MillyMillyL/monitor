import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import LogoDevOutlinedIcon from "@mui/icons-material/LogoDevOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { Link } from "react-router-dom";

export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      endpoint: "/monitor",
      icon: <DashboardCustomizeOutlinedIcon />,
    },
    { text: "Logging", endpoint: "/logging", icon: <LogoDevOutlinedIcon /> },
  ];
  // const sidebarItems2 = [
  //   { text: "Settings", icon: <SettingsOutlinedIcon /> },
  //   { text: "Profile", icon: <AccountBoxOutlinedIcon /> },
  // ];

  const handleDrawerClick = () => {
    setOpen((prev) => !prev);
  };

  const generateMenuItem = (arr) => {
    return arr.map((item) => (
      <ListItemButton
        key={item.text}
        component={Link}
        to={item.endpoint}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    ));
  };

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <IconButton onClick={handleDrawerClick}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          )}
          {!open && (
            <IconButton onClick={handleDrawerClick}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>{generateMenuItem(menuItems)}</List>
        <Divider />
        {/* <List>{SidebarItem(sidebarItems2)}</List> */}
      </Drawer>
    </Box>
  );
}
