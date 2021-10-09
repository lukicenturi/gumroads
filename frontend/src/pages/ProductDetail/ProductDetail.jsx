import css from './ProductDetail.module.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpRequest from "../../lib/http-request";
import Rating from "../../components/Rating/Rating";
import Button from "../../components/Button/Button";
import cn from "classnames";
import Modal from "../../components/Modal/Modal";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    rating: 0,
    review: '',
  });

  const fetchProduct = async () => {
    const data = await httpRequest.get(`products/${id}`);

    setProduct(data?.data || []);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const addReviewHandler = () => {
    setShowModal(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    await httpRequest.post(`products/${id}/review`, formValues);
    setLoading(false);
    setShowModal(false);
    setFormValues({
      rating: 0,
      review: '',
    });
    fetchProduct();
  }

  const inputChangeHandler = (name, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  }

  if (!product) return null;

  return (
    <section className={css.product__detail}>
      <div className={cn(css.product__container, 'container')}>
        <div className={css.product__name}>{product.name}</div>

        <div className={css.product__info}>
          <div className={css.product__rating}>
            <div className={css['product__rating-number']}>
              {product.average_rating}
            </div>
            <div className={css['product__rating-stars']}>
              <Rating readOnly rating={product.average_rating} />
            </div>
          </div>
          <Button onClick={addReviewHandler}>
            Add Review
          </Button>
        </div>

        <div className={css.product__reviews}>
          <div className={css['product__reviews-header']}>
            Reviews
          </div>
          <div className={css['product__reviews-grid']}>
            {product.product_reviews.map((review) => {
              return (
                <div key={review.id} className={css.product__review}>
                  <div className={css['product__review-stars']}>
                    <Rating readOnly rating={review.rating} />
                  </div>
                  <div className={css['product__review-text']}>
                    <strong>{review.rating}</strong>, &nbsp;
                    {review.review}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} title="What's your rating?" onClose={() => setShowModal(false)}>
        <form className={css.form} onSubmit={submitHandler}>
          <div className={css.form__group}>
            <label className={css.form__label}>Rating</label>
            <div className={css['form__input-rating']}>
              <Rating rating={formValues.rating}
                      onRatingChange={(val) => inputChangeHandler('rating', val)}
              />
            </div>
          </div>
          <div className={css.form__group}>
            <label className={css.form__label} htmlFor="review-text-input">Review</label>
            <textarea id="review-text-input"
                      className={css.form__input}
                      placeholder="Start typing..."
                      value={formValues.review}
                      onChange={(event) => inputChangeHandler('review', event.target.value)}
            />
          </div>
          <div>
            <Button disabled={loading}>Submit Review</Button>
          </div>
        </form>
      </Modal>
    </section>
  )
}

export default ProductDetail;
