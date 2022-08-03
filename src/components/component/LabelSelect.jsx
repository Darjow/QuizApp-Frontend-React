import { useFormContext } from 'react-hook-form';

const LabelSelect = ({label, options, validation = {}, required, className}) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className={className} >
      <label htmlFor={label}>{label}{required?"*":""}</label>
      <select
        {...register(label, validation)}
        id={label}
        name={label}>
        <option value={required?"" : "0"}>{required? "" : "Any"}</option>
        {options.map((value) => (
          <option key={value.id} value={value.id} >
            {value.name}
          </option>
        ))}
      </select>
      <div className='ml-10'>
        {errors[label] && <p className="text-red-500">{errors[label].message}</p>}
        </div>
    </div>
  );
};

export default LabelSelect;
