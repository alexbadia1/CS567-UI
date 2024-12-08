import { forwardRef } from 'react';

export interface FormFieldProps {
  name: string;
  fieldType: string;
  fieldOptions?: string[];
  autoComplete?: string;
  required: boolean;
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  FormFieldProps
>((props, ref) => {
  const { name, fieldType, fieldOptions, autoComplete, required } = props;
  let input = null;

  if (fieldType === 'select') {
    input = (
      <select ref={ref as React.Ref<HTMLSelectElement>} required>
        <option value="">Select an option</option>
        {fieldOptions?.map((option: string) => (
          <option key={`${name}-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    input = (
      <input
        name={name}
        type={fieldType}
        ref={ref as React.Ref<HTMLInputElement>}
        autoComplete={autoComplete}
        required
      />
    );
  }

  return (
    <div className="signup__content__form__field">
      <div className="signup__content__form__field__label">
        <span>
          {name}
          {required && <span className="required">*</span>}
        </span>
      </div>
      <div className="signup__content__form__field__value">{input}</div>
    </div>
  );
});
