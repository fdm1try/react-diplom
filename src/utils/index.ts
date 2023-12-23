export const formatPrice = (price: number, locale: string = 'ru') : string => Intl.NumberFormat(locale).format(price);
