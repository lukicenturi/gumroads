import css from './ProductCard.module.scss';
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const ProductCard = ({ product }) => {
  return (
    <div className={css.product__card}>
      <Link to={`/products/${product.id}`} className={css.product__name}>
        {product.name}
      </Link>
      <div className={css.product__rating}>
        <div>{product.average_rating}</div>
        <div className={css['product__rating-star']}>
          <Rating readOnly rating={product.average_rating} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
