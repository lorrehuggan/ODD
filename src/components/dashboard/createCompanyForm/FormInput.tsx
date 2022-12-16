interface Props {
  error?: string;
  register: any;
  name: string;
  placeholder?: string;
}
const FormInput = ({ error, register, name, placeholder }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between rounded bg-base-dark-300 p-2">
        <div className="flex w-full items-center">
          <label className="mr-2 flex-1 capitalize" htmlFor={name}>
            {name}
          </label>
          <input
            aria-label="Company name form input"
            {...register}
            placeholder={placeholder}
            className="bg-transparent p-2 text-white focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
};

export default FormInput;
