export function notEmpty(value: string) {
  return (value && value.length > 0) || 'Please fill out this field.';
}

export function positiveNumber(value: string) {
  return Number(value) > 0 || 'Please enter a positive number.';
}

export function validEmail(value: string) {
  return (
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
    'Please enter a valid email address.'
  );
}

export function validPassword(value: string) {
  return (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?.]).{8,}$/.test(value) ||
    'Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character.'
  );
}
