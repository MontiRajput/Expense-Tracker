import { useContext, useState } from "react";
import "./dropdown.css";

const Dropdown = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const items = [
    "All Categories",
    "Food",
    "Transportation",
    "Shopping",
    "Health",
    "Other",
  ];

  const handleSelect = (value: string) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <>
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      <div className="dropdown">
        <button
          type="button"
          className="dropdown-btn"
          onClick={() => setOpen(!open)}
        >
          {value} ▾
        </button>

        {open && (
          <div className="dropdown-menu">
            {items.map((item) => (
              <div
                key={item}
                className="dropdown-item"
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
