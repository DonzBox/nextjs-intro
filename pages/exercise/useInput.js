import { useState, useEffect } from "react";

/*┌───────────────────────────────────────────────┒
  │  INPUT 콤포넌트 컨트롤                        ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function UseInput() {
  const useInput = (inputValue, validator) => {
    const [value, setValue] = useState(inputValue);
    const onChange = (e) => {
      const value = e.target.value;
      // 같은뜻 const { target : {value} } = e;
      if (typeof validator === "function") {
        if (validator(value)) setValue(value);
      }
    };
    return { value, onChange };
    // 같은뜻 return { value : value, onChange : onChange }
  };
  const t = useInput("Mr.", (v) => v.length < 10 && !v.includes("@"));
  return (
    <div>
      <input
        value={t.value}
        onChange={t.onChange}
        type="text"
        placeholder="input text"
      />
      <input {...t} type="text" placeholder="input text" />
    </div>
  );
}
