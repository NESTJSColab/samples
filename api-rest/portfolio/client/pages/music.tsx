import Dashboard from "../components/album/dashboard";
import { AlbumType } from "../models/album";

interface MusicPageProps {
  albums: AlbumType[];
}

const MusicPage: React.FC<MusicPageProps> = ({ albums }): JSX.Element => (
  <Dashboard title="My Music" albums={albums} />
);

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      albums,
    },
  };
}

export default MusicPage;
