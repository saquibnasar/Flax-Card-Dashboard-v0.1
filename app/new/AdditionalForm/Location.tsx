import FormButton from "@/app/components/FormButton";
import location from "@/public/Icons/location.svg";
import Modal from "../Modal";

const Location = () => {
  return (
    <Modal
      title="Your Location"
      subtitle="Share your location with others"
      label="Location"
      icon={location}
    >
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="form-control w-full">
          <label className="label-text p-1">Paste your location link</label>
          <input type="text" className="input input-bordered" />
        </div>
        <FormButton />
      </form>
    </Modal>
  );
};

export default Location;
