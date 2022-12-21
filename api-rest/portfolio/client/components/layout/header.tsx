import {
  AppBar,
  createStyles,
  makeStyles,
  Switch,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent } from "react";
import LogIn from "../login";
import MainMenu from "../ui/menus/main-menu";

interface HeaderProps {
  darkTheme: boolean;
  handleThemeChange(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  })
);

const Header: React.FC<HeaderProps> = ({
  darkTheme,
  handleThemeChange,
}): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={styles.title} variant="h6" noWrap>
            My Portfolio
          </Typography>
          <div className={styles.grow} />
          <MainMenu />
          <Switch checked={darkTheme} onChange={handleThemeChange} />
          <LogIn />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
