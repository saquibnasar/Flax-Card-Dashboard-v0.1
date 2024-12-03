import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
  // inputValue: string;
  onChange: (value: string) => void;
  bg?: string;
}

const MobileNumberInput = ({ onChange, bg = "#F7F7F7" }: Props) => {
  const [value, setValue] = useState("");

  const handlePhoneInputChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };
  return (
    <div className="w-fit overflow-x-hidden h-full">
      <PhoneInput
        placeholder="99XXX-XXXX"
        inputStyle={{
          background: bg,
          border: "none",
          height: "full",
          fontSize: "16px",
        }}
        countrySelectorStyleProps={{
          buttonStyle: { background: bg, border: "none" },
          style: { background: bg, border: "none" },
        }}
        defaultCountry="in"
        value={value}
        onChange={handlePhoneInputChange}
      />
    </div>
  );
};

export default MobileNumberInput;
