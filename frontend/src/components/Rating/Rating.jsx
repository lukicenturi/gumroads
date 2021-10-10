import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";

import css from './Rating.module.scss'
import cn from "classnames";
import { useState } from "react";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons/faStarHalf";

const Rating = ({ onRatingChange, readOnly, rating }) => {
  const [isHovered, setHovered] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const roundedRating = Math.round(rating * 2) / 2;

  const handleMouseEnter = (i) => {
    if (readOnly) return;

    setHovered(true);
  }

  const handleMouseMove = (e, i) => {
    if (readOnly && !isHovered) return;

    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const width = rect.width;
    const isHalf = left < width / 2;

    setHoveredRating(i - (isHalf ? 0.5 : 0));
  }

  const handleMouseLeave = () => {
    if (readOnly) return;

    setHovered(false);
  }

  const handleClick = () => {
    if (readOnly) return;

    onRatingChange?.(hoveredRating);
  }

  const renderRatingPlaceholder = () => {
    return (
      <div className={css['rating--placeholder']}>
        {[...Array(5)].map((e, i) => {
          return (
            <span onMouseEnter={() => handleMouseEnter(i + 1)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={(e) => handleMouseMove(e, i + 1)}
                  onClick={handleClick}
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
    const isFractional = activatedRatingNumber % 1 > 0;

    return (
      <div className={css['rating--active']}>
        {[...Array(Math.floor(activatedRatingNumber))].map((e, i) => {
          return (
            <span key={i}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          )
        })}
        { isFractional && (
          <span>
            <FontAwesomeIcon icon={faStarHalf}/>
          </span>
        )}
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
