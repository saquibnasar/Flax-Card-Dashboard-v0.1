import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./Button";
import Spinner from "./Spinner";

// TODO:: Add types instead any
interface Props {
  schema: z.ZodObject<any>;
  defaultValues?: Record<string, any>;
  onSubmit: SubmitHandler<Record<string, any>>;
  labelMapping: string[];
  closeModal?: () => void;
  isLoading?: boolean;
}

const HookForm = ({
  schema,
  defaultValues,
  onSubmit,
  closeModal,
  isLoading = false,
  labelMapping,
}: Props) => {
  type schemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <form className="space-y-5">
      {Object.keys(schema.shape).map((field, index) => (
        <div key={field} className="form-control w-full">
          <label className="label-text p-1">{labelMapping[index]}</label>
          <input {...register(field)} className="input input-bordered" />
        </div>
      ))}
      <div className="flex justify-end space-x-3">
        <Button
          className="border border-dSecondary"
          width="160px"
          accent={true}
          type="button"
          onClick={closeModal}
        >
          Close
        </Button>
        <Button onClick={handleSubmit(onSubmit)} width="160px">
          {isLoading ? <Spinner /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default HookForm;
