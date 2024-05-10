export default function Input({ text, name, type, ...props }) {
  const inputClasses = "w-full rounded-md border border-teal-950 bg-white py-1 px-3 text-base outline-none focus:border-teal-500 focus:shadow-md";

  return (
    <div className="flex flex-row justify-between gap-4">
      <div className="mb-5">
        <label className="mb-3 block text-base font-medium text-teal-950" htmlFor={name}>
          {text}
        </label>
        <input type={type} id={name} name={name} className={inputClasses} {...props} />
      </div>
    </div>
  );
}
