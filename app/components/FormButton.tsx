import React from "react";

const FormButton = () => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="btn bg-black text-white hover:bg-iPrimary"
      >
        save
      </button>
    </div>
  );
};

export default FormButton;
