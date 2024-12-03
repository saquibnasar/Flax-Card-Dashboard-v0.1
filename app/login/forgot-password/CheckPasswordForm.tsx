import React, { FormEvent } from "react";

interface Props {
  newPassword: string;
  confirmPassword: string;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const CheckPasswordForm = ({
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
  handleSubmit,
}: Props) => {
  return (
    <form className="form w-full space-y-5" onSubmit={handleSubmit}>
      <div className="form-container w-full mb-5">
        <label className="form-control text-sm w-full max-w-xs mb-2">
          Enter New Password
        </label>
        <input
          type="password"
          placeholder="XXXXXXXX"
          className="input input-bordered w-full"
          onChange={(event) => setNewPassword(event.currentTarget.value)}
        />
      </div>

      <div className="form-container w-full">
        <label className="form-control text-sm w-full max-w-xs mb-2">
          Enter Confirm Password
        </label>
        <input
          type="password"
          placeholder="XXXXXXXX"
          className="input input-bordered w-full"
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        />
      </div>

      <button
        disabled={
          newPassword.length < 5 ||
          confirmPassword.length < 5 ||
          newPassword !== confirmPassword
        }
        type="submit"
        className="bg-blue rounded-full w-full h-10 mt-10 text-white hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
      >
        Change Password
      </button>
    </form>
  );
};

export default CheckPasswordForm;
