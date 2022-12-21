import {
  Avatar,
  Card,
  CardHeader,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import { AlbumType } from "../../models/album";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

interface AlbumCardProps {
  album: AlbumType;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }): JSX.Element => {
  const styles = useStyles();

  const { id, title } = album;

  return (
    <Container className={styles.root}>
      <Card className={styles.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={styles.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={id}
          subheader={title}
        />
      </Card>
    </Container>
  );
};

export default AlbumCard;
