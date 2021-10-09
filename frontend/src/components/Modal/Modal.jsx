import cn from "classnames";
import css from './Modal.module.scss';

const Modal = ({ children, isVisible, title, onClose }) => {
  const modalCss = cn(css.modal, {
    [css['modal--active']]: isVisible
  });

  return (
    <div className={modalCss}>
      <div className={css.modal__backdrop} onClick={onClose} />
      <div className={css.modal__wrapper}>
        <div className={css.modal__header}>
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal;
