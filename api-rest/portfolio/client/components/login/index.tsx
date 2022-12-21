import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const menuItems = {
  ["singout"]: [
    { name: "Profile", command: () => {} },
    { name: "My Account", command: () => {} },
    { name: "SignOut", command: () => {} },
  ],
  ["singin"]: [
    { name: "SignIn", command: () => {} },
    { name: "SignUp", command: () => {} },
  ],
};

const renderMenu = ({ key, anchorEl, menuId, isMenuOpen, handleMenuClose }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    {renderMenuItems(key)}
  </Menu>
);

const renderMenuItems = (key: string): JSX.Element =>
  menuItems[key].map(({ name, command }) => (
    <MenuItem key={name} onClick={command}>
      {name}
    </MenuItem>
  ));

const LogIn: React.FC = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const key = true ? "singout" : "signin"; //Get isAuth value from session, replace true

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {renderMenu({ key, anchorEl, menuId, isMenuOpen, handleMenuClose })}
    </>
  );
};

export default LogIn;
