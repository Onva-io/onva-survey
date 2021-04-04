function getLocale(preferred, locales) {
    const matching = locales.filter(function (locale) {
        return locale.locale === preferred;
    });

    const locale = !locales.length ? locales[0] : matching[0];

    return locale;
}

export {
    getLocale,
};
