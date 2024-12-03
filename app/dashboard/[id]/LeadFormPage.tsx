"use client";
import Spinner from "@/app/components/Spinner";
import Info from "@/app/insights/Info";
import { LeadForm } from "@/app/utils/entities/UserCardDetails";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import classNames from "classnames";
import React, { FormEvent, useState } from "react";
import { RiAddCircleLine, RiCloseLine } from "react-icons/ri";

interface Props {
  id: string;
  leadForm?: LeadForm;
}

const LeadFormPage = ({ id, leadForm }: Props) => {
  const [isChecked, setIsChecked] = useState(leadForm?.isActive || false);
  const { mutate, isLoading } = useUpdateUser(id);
  const [header, setHeader] = useState(leadForm?.header || "");
  const [disclaimer, setDisclaimer] = useState(leadForm?.disclaimer || "");
  const [inputFields, setInputFields] = useState([
    { label: "Name" },
    { label: "Email" },
    { label: "Phone No" },
    { label: "Message" },
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("employeeId", id);
    formData.append("leadForm[isActive]", JSON.stringify(isChecked));
    formData.append("leadForm[header]", header);
    formData.append("leadForm[disclaimer]", disclaimer);

    mutate(formData);
  };
  return (
    <div className="p-2 space-y-5 mb-5 relative">
      <div className="flex py-5 border-b-[2px] border-dSecondary space-x-10 items-center">
        <div>
          <h2 className="text-xl mb-2">Lead Form</h2>
          <p className="text-sm text-tSecondary">
            Lead form to capture lead information will be shown as soon as the
            profile is shared.
          </p>
        </div>
        <input
          type="checkbox"
          className={classNames({
            "toggle toggle-md": true,
            "bg-aGreen border-aGreen": isChecked,
          })}
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
        />
      </div>

      <form className="space-y-5 px-5" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-2">Customize lead form</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Form header</span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full bg-sSecondary border-none"
            value={header}
            onChange={(event) => setHeader(event.target.value)}
          />
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h3>Input Fields</h3>
          </div>
          {inputFields.map((input) => (
            <div key={input.label} className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder={input.label}
                  className="w-full input input-bordered bg-sSecondary border-none"
                  disabled
                />
                <button
                  className="btn bg-sSecondary text-2xl"
                  onClick={() =>
                    setInputFields(
                      inputFields.filter((field) => field.label !== input.label)
                    )
                  }
                >
                  <RiCloseLine />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Form Disclaimer</span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full bg-sSecondary border-none"
            value={disclaimer}
            onChange={(event) => setDisclaimer(event.target.value)}
          />
        </div>

        <div className="flex space-x-5 justify-end">
          <button className="button-secondary">Cancel</button>
          <button className="button-primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadFormPage;
//   const [isAddActive, setIsAddActive] = useState(false);
// const [fieldTitle, setFieldTitle] = useState({ label: "" });
