import ErrorMessage from "@/app/components/ErrorMessage";
import http from "@/app/services/api-client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const OtpForm = () => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null)
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;

    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    await http
      .post("/auth/verify-email-otp", {
        email: window.localStorage.getItem("email"),
        otp: parseInt(otp.join("")),
      })
      .then((response) => {
        if (response.statusText === "400") setError("Invalid Otp");
        setIsLoading(false);
        router.push("/new");
      })
      .catch((response) => {
        if (response.response.status === 400) {
          setError("Invalid OTP. Please try again.");
        } else if (response.response.status === 404) {
          setError("Should contain 6 numbers");
        } else {
          setError("Unexpected error occurred");
        }
        setIsLoading(false);
      });
  };
  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-start text-4xl">OTP Verification</h1>
        <p className="text-tSecondary">
          we have sent you the otp, Please check your mail
        </p>
      </div>

      <ErrorMessage>{error}</ErrorMessage>
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

      {
        <button
          className="transition-all duration-150 ease-linear hover:opacity-90 hover:scale-[0.98] active:scale-[0.95] w-full bg-blue px-10 py-2 text-white rounded-lg"
          disabled={otp.join("").length !== 6}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-sm" />
          ) : (
            "Verify"
          )}
        </button>
      }
    </form>
  );
};

export default OtpForm;
