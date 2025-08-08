import { useLoaderData } from 'react-router-dom';

import PostItem from '../components/PostItem';

function PostPage() {
  const post = useLoaderData();

  return <PostItem post={post} />;
}

export default PostPage;

export async function loader({ params }) {
  const postId = params.id;
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
  return response
}
