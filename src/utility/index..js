export const excerpt = (str, count) => {
    if (str.lenght > count) {
        str = str.substring(0, count) + "...";
    }
    return str;
};

