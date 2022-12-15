export const formatNumber = (x: number) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const intlFormat = (num: number) => {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}

export const makeFriendly = (num: number) => {
    if (num >= 1000000)
        return intlFormat(num / 1000000) + 'M';
    if (num >= 1000)
        return intlFormat(num / 1000) + 'k';
    return intlFormat(num);
}