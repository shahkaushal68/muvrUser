export const emailRegex = RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const nameRegex = RegExp(/^([a-zA-Z ]){1,100}$/i);

export const urlRegex = RegExp(
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
);

export const numberOnlyRegex = RegExp(/^[0-9]+$/);
export const numberAlphaNumericOnlyRegex = RegExp(/^[0-9a-zA-Z-]+$/);
export const nameAccountRegex = RegExp(/^([a-zA-Z\/ ]){1,250}$/i);
