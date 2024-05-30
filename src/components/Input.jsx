import { useRef } from "react";
import { maskMoney } from "../utils";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

export default function Input({ text, name, mask, ...props }) {
  const inputRef = useRef("");
  const inputClasses = "w-full rounded-md border border-teal-950 bg-white py-1 px-3 text-base outline-none focus:border-teal-500 focus:shadow-md";

  function handleChange(event) {
    if (mask == "money") inputRef.current.value = maskMoney(event);
  }
  const numberMask = createNumberMask({
    prefix: "",
    allowDecimal: false,
    includeThousandsSeparator: false,
  });
  return (
    <div className="mb-5">
      <label className="mb-3 block text-base font-medium text-black" htmlFor={name}>
        {text}
      </label>
      {mask == "money" && <input ref={inputRef} id={name} name={name} className={inputClasses} {...props} onChange={handleChange} />}
      {mask == "time" && <MaskedInput mask={[/\d/, /\d/, ":", /\d/, /\d/]} ref={inputRef} id={name} name={name} className={inputClasses} {...props} />}
      {mask == "number" && <MaskedInput mask={numberMask} ref={inputRef} id={name} name={name} className={inputClasses} {...props} />}
    </div>
  );
}
