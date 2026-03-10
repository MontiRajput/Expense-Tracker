type ButtonProps = {
  value: string;
  isStyle?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button = ({ value, isStyle, onClick, type }: ButtonProps) => {
  return (
    <button
      className="small"
      style={{
        padding: "7px 15px",
        margin: "20px",
        backgroundColor: isStyle ? "rgb(84, 192, 105)" : "",
      }}
      onClick={onClick}
      type={type}
    >
      {value}
    </button>
  );
};

export default Button;
