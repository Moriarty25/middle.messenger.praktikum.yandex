export function getFormData(event: Event) {
  const img = (event.target as HTMLInputElement).files![0];
  const formData = new FormData();
  formData.append("avatar", img);
  return formData;
}
