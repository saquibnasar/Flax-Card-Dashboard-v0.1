import "./input.css";

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const Input = ({ label, name, type, placeholder }: Props) => {
  return (
    <div className="form-control w-full">
      <label className="label-text p-1">{label}</label>
      <input name={name} type={type} className="input input-bordered" />
    </div>
  );
};

export default Input;
