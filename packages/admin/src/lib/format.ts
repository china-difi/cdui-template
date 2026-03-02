/**
 * 格式化数字为货币千分位
 *
 * @param value 数字
 */
export const formatMoney = (value: number, decimals?: number) => {
  const parts = value.toFixed(decimals != null ? decimals : (decimals = 2)).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return integerPart + (decimals ? '.' + parts[1] : '');
};
