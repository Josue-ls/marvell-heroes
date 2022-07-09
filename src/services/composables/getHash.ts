import md5 from "md5";

export const getHash = (
  timeStamp: number,
  private_key: string,
  public_key: string
) => {
  const hash = md5(`${timeStamp}${private_key}${public_key}`);
  return hash;
};
