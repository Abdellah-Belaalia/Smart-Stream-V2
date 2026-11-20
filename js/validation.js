export function channelValidation() {
    const form = document.getElementById('form-ajouter')
    console.log("==> Working!", form)

    if (!form) return;

    const regexName = /^[A-Za-zÀ-ÿ0-9\s-]{2,30}$/;
    const regexChannelNumber = /^\d{1,6}$/;
    const regexCategory = /^[A-Za-z\s-]{4,15}$/;
    const regexCountry = /^[A-Za-zÀ-ÿ\s]{5,15}$/;
    const regexCountryCode = /^[A-Z]{2,5}$/;
    const regexUrl = /^https?:\/\/(?:[A-Za-z0-9-.]+\.)+[A-Za-z]{2,}(?::\d{1,5})?(?:[\/?#]\S*)?$/

    const name = document.getElementById('name')
    const channelNumber = document.getElementById('channelNumber')
    const category = document.getElementById('category')
    const country = document.getElementById('country')
    const countryCode = document.getElementById('countryCode')
    const streamUrl = document.getElementById('streamUrl')

    const errorNom = document.getElementById('errorNom')
    const errorChannelNumber = document.getElementById('errorChannelNumber')
    const errorCategory = document.getElementById('errorCategory')
    const errorCountry = document.getElementById('errorCountry')
    const errorCountryCode = document.getElementById('errorCountryCode')
    const errorStreamUrl = document.getElementById('errorStreamUrl')
    console.log("==> Working!")

    name.addEventListener('input', () => {
        if (regexName.test(name.value.trim())) {
            console.log("==> Name!", regexName.test(name.value.trim()))
            errorNom.textContent = ""
        } else {
            errorNom.textContent = "Entrer un nom valid"
        }
    })
    channelNumber.addEventListener('input', () => {
        if (regexChannelNumber.test(channelNumber.value.trim())) {
            errorChannelNumber.textContent = ""
        } else {
            errorChannelNumber.textContent = "Entrer un nombre valid"
        }
    })
    category.addEventListener('input', () => {
        if (regexCategory.test(category.value.trim())) {
            errorCategory.textContent = ""
        } else {
            errorCategory.textContent = "Entrer un nom valid"
        }
    })
    country.addEventListener('input', () => {
        if (regexCountry.test(country.value.trim())) {
            errorCountry.textContent = ""
        } else {
            errorCountry.textContent = "Entrer un nom valid"
        }
    })
    countryCode.addEventListener('input', () => {
        if (regexCountryCode.test(countryCode.value.trim())) {
            errorCountryCode.textContent = ""
        } else {
            errorCountryCode.textContent = "Entrer un nom valid"
        }
    })
    streamUrl.addEventListener('input', () => {
        if (regexUrl.test(streamUrl.value.trim())) {
            errorStreamUrl.textContent = ""
        } else {
            errorStreamUrl.textContent = "Entrer un nom valid"
        }
    })
}
