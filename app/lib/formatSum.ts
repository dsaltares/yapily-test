const formatSum = (currency: string, sum: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(sum);

export default formatSum;
