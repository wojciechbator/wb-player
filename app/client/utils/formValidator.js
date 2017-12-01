export const validField = value => value && value.trim() !== '';

export const validEmail = email =>
    email && email.trim() !== '' && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const validPassword = password =>
    password && password.trim() !== '' && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/.test(password);

export const validConfirmPassword = (password, confirmPassword) =>
    password && confirmPassword === password;