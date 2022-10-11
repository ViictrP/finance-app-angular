const currencyMasker = (value: string): [string, number] => {
  const masked = value
    .replace(/\D/g, '')
    .padStart(4, '0')
    .replace(/(\d)(\d{2})$/g, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.')
    .replace(/^0/, '');

  const currency = parseFloat(masked.replace(/\./g, '').replace(/,/g, '.'));
  return [masked, currency];
};

export default currencyMasker;
