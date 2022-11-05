import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { UserTable, ActorTable } from "components/table";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 210;

const ClippedDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: any) => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Admin Page
          </Typography>
          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Noe Philip Gabriel M. Restum"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="avatar-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/login")}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", width: "200px" }}>
          <List>
            <ListItem disablePadding onClick={() => navigate("/admin/users")}>
              <ListItemButton>
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary={"Users"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => navigate("/admin/reviews")}>
              <ListItemButton>
                <ListItemIcon>
                  <LiveTvIcon />
                </ListItemIcon>
                <ListItemText primary={"Reviews"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => navigate("/admin/movies")}>
              <ListItemButton>
                <ListItemIcon>
                  <LiveTvIcon />
                </ListItemIcon>
                <ListItemText primary={"Movies"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => navigate("/admin/actors")}>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Actors"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
          <Link underline="hover" color="inherit" href="/admin">
            Admin
          </Link>
          {/* <Typography color="text.primary">{showScreen}</Typography> */}
        </Breadcrumbs>
        {location.pathname === "/admin/users" && <UserTable />}
        {location.pathname === "/admin/actors" && <ActorTable />}
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
