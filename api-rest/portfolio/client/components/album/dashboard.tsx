import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AlbumType } from "../../models/album";
import AlbumCard from "./card";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  })
);

interface DashboardProps {
  title: string;
  albums: AlbumType[];
}

const Dashboard: React.FC<DashboardProps> = ({
  title,
  albums,
}): JSX.Element => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <Box>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Container className={styles.list}>
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </Container>
    </Container>
  );
};

export default Dashboard;
