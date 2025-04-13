import './Button.styles.scss';

interface ButtonProps {
  className?: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  type,
  disabled = false,
  children,
  onClick,
}: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    onClick?.(event);
  };
  return (
    <button
      disabled={disabled}
      className={`button ${className} ${disabled ? ' button_disabled' : ''}`}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
