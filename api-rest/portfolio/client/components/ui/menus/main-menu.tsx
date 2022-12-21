import Link from "next/link";

import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  Album,
  Code,
  ContactSupport,
  Home,
  Info,
  SvgIconComponent,
} from "@material-ui/icons";

type MenuItem = {
  title: string;
  icon?: SvgIconComponent;
  path: string;
};

const menus: MenuItem[] = [
  {
    title: "About Me",
    icon: Info,
    path: "/about",
  },
  {
    title: "Blog",
    icon: Info,
    path: "/blog",
  },
  {
    title: "My Music",
    icon: Album,
    path: "/music",
  },
  {
    title: "My Code",
    icon: Code,
    path: "/code",
  },
  {
    title: "Contact Me",
    icon: ContactSupport,
    path: "/contact",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      padding: "10px",
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  })
);

const MainMenu: React.FC = (): JSX.Element => {
  const styles = useStyles();

  return (
    <>
      {menus.map(({ title, path }) => (
        <Link key={title} href={path}>
          <IconButton>
            <Typography
              className={styles.title}
              variant="subtitle1"
              color="secondary"
              noWrap
            >
              {title}
            </Typography>
          </IconButton>
        </Link>
      ))}
    </>
  );
};

export default MainMenu;
