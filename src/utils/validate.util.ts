export const isRequired = (value: string | boolean): string | undefined => {
  if (!value) return 'Это поле обязательно';
}

export const isLength = (
  min: number | undefined = 1,
  max: number | undefined = 1
) => (value: string): string | undefined => {
  if (!value) return 'Это поле обязательно';
  if (value.length < min) return `Длина поля должна быть не менее ${min} символов`;
  if (value.length > max) return `Длина поля должна быть не более ${max} символов`;
}