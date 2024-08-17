function stringToColor(string: string): string {
  // Calculate a hash of the string, character by character
  const hash = string.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Generate the three color values in hexadecimal using bitwise operations on the hash
  const color = Array(3)
    .fill(0)
    .map((_, i) => {
      const value = (hash >> (i * 8)) & 0xff;
      return `00${value.toString(16)}`.slice(-2); // Ensure the value is two characters long
    })
    .join("");

  return `#${color}`;
}

interface userFullNameToAvatarPropsParams {
  firstName: string;
  lastName: string;
}

export function userFullNameToAvatarProps({
  firstName,
  lastName,
}: userFullNameToAvatarPropsParams) {
  return {
    sx: {
      bgcolor: stringToColor(`${firstName}${lastName}`),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}
