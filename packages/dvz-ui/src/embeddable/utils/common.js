export const alphaSort = (reverse, locale, a, b) => {
    return new Intl.Collator(locale, {
        caseFirst: "upper",
        numeric: true,
        sensitivity: "variant",
    }).compare(reverse ? b : a, reverse ? a : b);
};

export const numericSort = (reverse, a, b) => {
    return reverse ? b - a : a - b;
};

export const dateSort = (reverse, a, b) => {
    let aDate = Date.parse(a);
    let bDate = Date.parse(b);
   
    if (!isNaN(aDate) && !isNaN(bDate)) {
        return reverse ? bDate - aDate : aDate - bDate;
    }

    return 0;
}