import React, { useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface Props {
  control: Control<FieldValues>;
  name: string;
  label: string;
  defaultValue: string;
  isTitle?: boolean;
}

const TextInput = ({ control, defaultValue, name, label, isTitle }: Props) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (isTitle && inputValue.length > 30) {
      setError("Title should not exceed 30 characters");
    } else {
      setError(null);
      onChange(inputValue);
    }
  };

  return (
    <div className="form-control">
      <label className="label mb-2">
        <span className="label-text">{label}</span>
      </label>

      <input
        type="text"
        className="input input-bordered w-full bg-sSecondary border-none"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default TextInput;
