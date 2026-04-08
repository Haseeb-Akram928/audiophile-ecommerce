const FormInputGroup = ({
  label,
  id,
  type = "text",
  placeholder,
  register: registerFn,
  error,
  inputClassName,
  wrapperClassName,
  validationRules,
}) => {
  return (
    <div className={`input-group ${wrapperClassName || ""}`}>
      <div className="input-label-row">
        <label htmlFor={id} className={`input-label ${error ? "error" : ""}`}>
          {label}
        </label>
        {error && <span className="error-message">{error.message}</span>}
      </div>
      <input
        id={id}
        type={type}
        {...registerFn(id, validationRules || {})} 
        className={`input-field ${error ? "error" : ""} ${inputClassName || ""}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInputGroup;
