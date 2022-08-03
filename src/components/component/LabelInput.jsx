import { useFormContext } from "react-hook-form";

const LabelInput = ({id, required, value, label, type, defaultValue, validation, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div>
      <label htmlFor={label}>{label}{required?"*":""}</label>
      <input
        {...register(label, validation)}
        placeholder={defaultValue}
        type={type}
        id={id}
        name={label}
        {...rest}
        value={value}
      />
      {errors[label] && (
        <div className="ml-10">
          <p className="text-red-500">{errors[label].message}</p>
        </div>
      )}
    </div>
  );
};

export default LabelInput;