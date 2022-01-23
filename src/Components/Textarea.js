export default function TextArea({ id, placeholder, onChange, value }) {
  return (
    <div>
      <textarea
        value={value}
        className="textarea"
        onChange={({ target }) => onChange(target.value)}
        type="textarea"
        placeholder={placeholder}
        rows="5"
        cols="10"
        id={id}
        required={true}
      />
    </div>
  );
}
