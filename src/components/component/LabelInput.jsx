import { useFormContext } from "react-hook-form";

const LabelInput = ({id, required, value, label, type, validation, onChange, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div>
      <label htmlFor={label}>{label}{required?"*":""}</label>
      <input
        {...register(label, validation)}
        type={type}
        id={id}
        name={label}
        onChange={onChange}
        {...rest}
        value={value}
      />
      {errors[label] && (
        <div>
          <p className="text-red-500">{errors[label].message}</p>
        </div>
      )}
    </div>
  );
};

export default LabelInput;