export function formatPhoneNumber(value: string) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, ""); // remove non-digit characters
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 3) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  }

  return `(${phoneNumber.slice(0, 2)})${phoneNumber.slice(2, 3)}${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

