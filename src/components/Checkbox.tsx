import React from "react";

interface CheckboxProps {
  label: string; // The label displayed next to the checkbox
  checked: boolean; // Whether the checkbox is checked
  onChange: (checked: boolean) => void; // Callback to handle changes
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;