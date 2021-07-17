import { ChangeEvent, useRef } from "react";

interface InputProps {
  id: string;
  placeholder: string;
  label: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

export const Input = (props: InputProps) => {
  const {
    id,
    wrapperClassName = '',
    placeholder = '',
    label = '',
    type = 'text',
    error = false,
    errorText = '',
    required = false,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={wrapperClassName}>
      <div
        className={`border transition duration-150 ease-in-out ${error
          ? 'focus-within:border-red border-red'
          : 'focus-within:border-primary border-gray-gray4'
          }`}
        onClick={() => inputRef.current?.focus()}
      >
        <label
          htmlFor={id}
          className='text-base text-left float-left pl-2 text-primary font-normal placeholder-gray-gray4 py-1.5'
        >
          {label} {required && <span className='text-red'>*</span>}
        </label>
        <input
          ref={inputRef}
          type={type}
          className='w-full px-2.5 pb-1.5 text-primary outline-none text-base font-medium rounded-md'
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {errorText && (
        <p className='text-xs pl-2  text-red mb-4'>{errorText}</p>
      )}
    </div>
  );
};
