import { ChangeEvent, FormEvent, useRef, useState } from "react";

const CheckOtpForm = ({ handleOtp }: { handleOtp: (otp: number) => void }) => {
  const length = 6;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null)
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpNumber = parseInt(otp.join(""));
    handleOtp(otpNumber);
  };
  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="w-full flex space-x-2">
        {otp.map((digit, index) => (
          <div key={index} className="form-control">
            <input
              className="input text-center input-bordered p-2 w-[50px]"
              type="number"
              maxLength={1}
              onChange={(event) => handleChange(event, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          </div>
        ))}
      </div>

      <button
        disabled={otp.length !== 6}
        type="submit"
        className="bg-blue rounded-full w-full h-10 mt-10 text-white hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
      >
        Continue
      </button>
    </form>
  );
};

export default CheckOtpForm;
