
const ValidationProperty = {

  validateRequired: (value) => {
    if (value === null || value === '') return 'This field is required ! '
    return undefined
  },

  validateEmail: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email format ! ';
    }
    return undefined; // No error if valid
  },

  validatePassword: (value) => {
    if (!value || value.length < 6) return 'Password must be at least 6 characters long !'
    return undefined
  },



}
export default ValidationProperty