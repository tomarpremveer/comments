export default function Input({ id, onChange, placeholder, value }) {
  return (
    <div>
      <input
        value={value}
        id={id}
        className="input"
        onChange={({ target }) => onChange(target.value)}
        type="text"
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
}
