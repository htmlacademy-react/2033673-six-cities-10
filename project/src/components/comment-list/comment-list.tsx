import { Comment } from '../../types/comment';
import CommentItem from '../comment-item/comment-item';

type CommentListProps = {
  comments: Comment[];
};

function CommentList({ comments }: CommentListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      }
    </ul>
  );
}

export default CommentList;
