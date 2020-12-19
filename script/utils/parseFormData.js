export default function parseFormData(formData) {
  const state = {};
  formData.forEach((value, key) => { state[key] = value; });
  return state;
}
