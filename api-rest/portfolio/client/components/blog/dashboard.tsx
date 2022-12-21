import { createStyles, makeStyles, Typography } from "@material-ui/core";

import { Post } from "../../models/post";
import PostCard from "./postcard";

const useStyles = makeStyles(() => createStyles({}));

interface DashboardProps {
  posts: Post[];
}

const Dashboard: React.FC<DashboardProps> = ({ posts }) => {
  const styles = useStyles();

  return (
    <div>
      {/* {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })} */}
    </div>
  );
};

export default Dashboard;
