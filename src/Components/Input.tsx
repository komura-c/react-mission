import { UseFormRegister } from "react-hook-form";

type InputProps = {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  required?: boolean,
  wrapperClassName?: string,
  error?: boolean,
  errorText?: string,
}

export const Input = (props: InputProps) => {
  const {
    name,
    wrapperClassName = '',
    placeholder = '',
    label = '',
    type = 'text',
    register,
    required = false,
    errorText = '',
  } = props;

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={name}
        className='block text-left text-base font-medium pl-2 py-1.5'
      >
        {label} {required && <span className='text-red'>*</span>}
      </label>
      <input
        type={type}
        className='w-full px-2.5 py-1.5 text-base font-medium rounded placeholder-gray-400 border-2 border-black'
        id={name}
        placeholder={placeholder}
        {...register(name, { required })}
      />
      {errorText && (
        <p className='pl-2 mb-4 text-xs text-red'>{errorText}</p>
      )}
    </div>
  );
};
