import {
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "2rem",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "1.5rem",
      textAlign: "left",
    },
    root: {
      flexGrow: 1,
    },
  })
);

const About: React.FC<AboutProps> = ({ about, skills }): JSX.Element => {
  const styles = useStyles();

  const { title, content } = about;

  return (
    <Container className={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid item>
            <Typography className={styles.title} variant="h4">
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item>
            <Typography className={styles.subtitle} variant="subtitle1">
              My Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined" square>
              <CardContent>{content}</CardContent>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item>
            <Typography className={styles.subtitle} variant="subtitle1">
              My Skills
            </Typography>
            <Grid item xs={6}>
              {/* {skills.category.tags.map(({ name, value }) => {
                return <>{name}</>;
              })} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

interface Tag {
  name: string;
  value: number;
}

interface AboutProps {
  about: {
    id: string;
    title: string;
    slogan: string;
    content: string;
  };
  skills: {
    category: string;
    tags: Tag[];
  };
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      about: {
        id: "1",
        title: "ABOUT",
        content: `Dynamic and motivated professional with a proven record of generating and building software, 
      managing projects from concept to the implementation, designing architectures, and coaching teams to technical improvement. 
      Skilled in building cross-functional teams, demonstrating communication skills, and making critical decisions during challenges. 
      I think that I am an adaptable and transformational leader with an ability to work independently, creating effective presentations, 
      and developing opportunities that further establish organizational goals. During these years, I have been working in different 
      projects and companies where I have been improving and acquiring solid knowledge mainly in two areas. 
      The first one, as a full-stack programmer for the .NET and JavaScript platform, always trying to use best practices and patterns. 
      The second one is as a business analyst and as a technical / process team lead, working on different business solutions for 
      different economic sectors mainly dedicated to the supply chain solutions, transportations, warehousing, foreign trading, and right now with lead marketing.`,
      },
      skills: {
        category: {
          name: "code",
          tags: [
            {
              name: "C#",
              value: 95,
            } as Tag,
          ],
        },
      },
    },
  };
}

export default About;
