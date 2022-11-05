import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchBox from "./SearchBox";
import useOffSetTop from "hooks/useOffSetTop";
import NetflixNavigationLink from "./NetflixNavigationLink";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Favorites"];

const Header = () => {
  const navigate = useNavigate();
  const isOffset = useOffSetTop(100);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: any) => {
    console.log(setting);
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        height: 65,
        boxShadow: 0,
        px: "60px",
        background: "transparent",
        ...(isOffset && {
          bgcolor: "black",
          boxShadow: (theme) => theme.shadows[4],
        }),
      }}
    >
      <Toolbar disableGutters>
        {/* <Logo sx={{ mr: { xs: 2, sm: 4 } }} /> */}

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Digital Streaming Application
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {pages.map((page) => (
            <NetflixNavigationLink
              to=""
              variant="subtitle1"
              key={page}
              onClick={handleCloseNavMenu}
            >
              {page}
            </NetflixNavigationLink>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
          <SearchBox />
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
  );
};
export default Header;
