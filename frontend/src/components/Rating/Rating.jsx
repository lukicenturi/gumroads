import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";

import css from './Rating.module.scss'
import cn from "classnames";
import { useState } from "react";

const Rating = ({ onRatingChange, readOnly, rating }) => {
  const [isHovered, setHovered] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const roundedRating = Math.round(rating);

  const handleMouseEnter = (i) => {
    if (readOnly) return;

    setHovered(true);
    setHoveredRating(i);
  }

  const handleMouseLeave = () => {
    if (readOnly) return;

    setHovered(false);
  }

  const renderRatingPlaceholder = () => {
    return (
      <div className={css['rating--placeholder']}>
        {[...Array(5)].map((e, i) => {
          return (
            <span onMouseEnter={() => handleMouseEnter(i + 1)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onRatingChange(i + 1)}
                  key={i}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          )
        })}
      </div>
    )
  }

  const renderActivatedRating = () => {
    const activatedRatingNumber = isHovered ? hoveredRating : roundedRating;

    return (
      <div className={css['rating--active']}>
        {[...Array(activatedRatingNumber)].map((e, i) => {
          return (
            <span key={i}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          )
        })}
      </div>
    )
  }

  const ratingCss = cn(css.rating, {
    [css['rating--changeable']]: !readOnly
  });

  return (
    <div className={ratingCss}>
      {renderRatingPlaceholder()}

      {renderActivatedRating()}
    </div>
  )
}

export default Rating;
