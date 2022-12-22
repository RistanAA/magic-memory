import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";


const navItems = ["Home", "About", "Contact"];
const drawerWidth = 240;
const Header = (props) => {
  const navigate = useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard')
  }

  const handleHome = () => {
    navigate('/home')
  }
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <CssBaseline />
      <AppBar component="nav" style={{ background: "rgba(0,0,0,0.5)" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "Rubik Gemstones",
            }}
            onClick={handleHome}
          >
            Magic Memory
          </Typography>
          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box> */}
          <div className="d-flex gap-2">
            <IconButton sx={{ color: "white" }}>
              <Icon>music_note</Icon>
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Icon onClick={handleLeaderboard}>leaderboard</Icon>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
