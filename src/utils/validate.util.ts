export const isRequired = (value: string | boolean): string | undefined => {
  if (!value) return 'Это поле обязательно';
}

export const isLength = (
  min: number | undefined = 1,
  max: number | undefined = 1,
  text?: {
    min?: string;
    max?: string;
    common?: string;
  }
) => (value: string): string | undefined => {
  if (!value) return text?.common || 'Это поле обязательно';
  if (value.length < min) return text?.min || `Длина поля должна быть не менее ${min} символов`;
  if (value.length > max) return text?.max || `Длина поля должна быть не более ${max} символов`;
}