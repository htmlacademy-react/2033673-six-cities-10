import { ChangeEvent, Fragment, useState } from 'react';
import { Setting } from '../../const';

type NewComment = {
  rating: number;
  comment: string;
};

function CommentForm(): JSX.Element {

  const [comment, setComment] = useState({ rating: 0, comment: '' } as NewComment);

  const handleChangeRating = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setComment({ ...comment, rating: +evt.target.value });
  };

  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    evt.preventDefault();
    setComment({ ...comment, comment: evt.target.value });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          [...Array(Setting.MaxRating)].map((_, index) => {
            const starNumber: number = Setting.MaxRating - index;
            return (
              <Fragment key={starNumber}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={starNumber}
                  id={`${starNumber}-star`}
                  type="radio"
                  onChange={handleChangeRating}
                />
                <label
                  htmlFor={`${starNumber}-star`}
                  className="reviews__rating-label form__rating-label"
                  title="perfect"
                >
                  <svg
                    className="form__star-image"
                    width="37"
                    height="33"
                  >
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeText}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
