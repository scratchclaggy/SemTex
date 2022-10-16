import convert from "color-convert";

export const isLight = (color: string) => {
  const hsl = convert.hex.hsl(color);
  if (hsl[2] > 50) {
    return true;
  }
  return false;
};
