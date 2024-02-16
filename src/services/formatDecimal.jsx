export const formatNumberWithDecimal = (num, isRound = true) => {
  let numStr = num.toString();
  if (numStr.includes(".")) {
    numStr = numStr.replace(/(\.[0-9]*[1-9])0+$/, "$1");
    numStr = numStr.replace(/\.$/, "");
    const decimalPart = numStr.split(".")[1];
    if (decimalPart) {
      if (isRound) {
        numStr = Math.round(numStr);
      } else {
        numStr = parseFloat(numStr).toFixed(2);
      }
    }
  }

  return numStr;
};

export const formatCardNumber = (number) => {
  const last4Digits = number.slice(-4);
  const maskedPart = "****";
  const maskedCardNumber = `${maskedPart} ${last4Digits}`;
  return maskedCardNumber;
};
