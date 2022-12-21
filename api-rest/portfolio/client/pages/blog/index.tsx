import DashBoard from "../../components/blog/dashboard";

import { Post } from "../../models/post";

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

interface BlogProps {
  posts: Post[];
}

const BlogPage: React.FC<BlogProps> = ({ posts }): JSX.Element => (
  <div>
    <h1>Blog</h1>
    <DashBoard posts={posts} />
  </div>
);

export default BlogPage;
