const digitMasker = (value: string): string => {
  return value.replace(/\D/g, '');
};

export default digitMasker;
