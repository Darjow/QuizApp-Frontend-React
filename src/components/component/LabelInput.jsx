import { useFormContext } from "react-hook-form";

const LabelInput = ({id, required, value, label, type, validation, onChange, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="px-5 py-3">
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
          <p data-cy="labelinput_error" className="text-red-500">{errors[label].message}</p>  
      )}
    </div>
  );
};

export default LabelInput;