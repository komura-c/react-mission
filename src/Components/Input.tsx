import { FieldError, UseFormRegister } from "react-hook-form";

type InputProps = {
  name: string;
  wrapperClassName?: string,
  placeholder: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  required?: boolean,
  maxLength?: number
  error?: FieldError,
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
    maxLength = 60,
    error,
  } = props;

  return (
    <div className={wrapperClassName + 'relative'}>
      <label
        htmlFor={name}
        className='text-base font-medium pl-2'
      >
        {label} {required && <span className='text-red'>*</span>}
      </label>
      <input
        type={type}
        className='w-full h-12 px-2.5 py-1.5 mt-2 mb-6 text-base font-medium rounded bg-gray-200'
        id={name}
        placeholder={placeholder}
        {...register(name, { required, maxLength })}
      />
      {error?.type === 'required' && (
        <p className='block absolute bottom-0 pl-2 text-sm text-red-500'>{label}は必須項目です。</p>
      )}
      {error?.type === 'maxLength' && (
        <p className='block absolute bottom-0 pl-2 text-sm text-red-500'>{label}は{maxLength}文字以下です。</p>
      )}
    </div>
  );
};
