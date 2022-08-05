import { useFormContext } from 'react-hook-form';

const LabelSelect = ({label, options, validation = {}, required, ...rest}) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="px-5 py-3">
      <label htmlFor={label}>{label}{required?"*":""}</label>
      <select
        {...register(label, validation)}
        id={label}
        name={label}
        {...rest}>
        <option value={required?"" : "*"}>{required? "" : "Any"}</option>
        {options.map((value) => (
          <option key={value.id} value={value.id} >
            {value.name}
          </option>
        ))}
      </select>
      <div>
        {errors[label] && <p data-cy="labelinput_error" className="text-red-500">{errors[label].message}</p>}
        </div>
    </div>
  );
};

export default LabelSelect;
