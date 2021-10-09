import css from './Button.module.scss';

const Button = ({ children, disabled, onClick }) => {
  return (
    <button className={css.btn} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
