export default function Input({
  type,
  name,
  value,
  handler,
  labelText,
  placeholder,
}) {
  return (
    <div className="input-box">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handler}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
}
