import { getChannels, addChannel } from "./api.js";
import { displayChanges } from "./search.js";
import { categoryShower } from "./ui.js";

export async function createChannel(channels) {

    // const regexName = /^[A-Za-zÀ-ÿ0-9\s-]{2,30}$/;
    // const regexChannelNumber = /^\d{1,6}$/;
    // const regexCategory = /^[A-Za-z\s-]{4,15}$/;
    // const regexCountry = /^[A-Za-zÀ-ÿ\s]{5,15}$/;
    // const regexCountryCode = /^[A-Z]{2,5}$/;
    // const regexUrl = /^https?:\/\/(?:[A-Za-z0-9-.]+\.)+[A-Za-z]{2,}(?::\d{1,5})?(?:[\/?#]\S*)?$/

    const name = document.getElementById('name')
    const channelNumber = document.getElementById('channelNumber')
    const category = document.getElementById('category')
    const country = document.getElementById('country')
    const countryCode = document.getElementById('countryCode')
    const streamUrl = document.getElementById('streamUrl')

    // const errorNom = document.getElementById('errorNom')
    // const errorChannelNumber = document.getElementById('errorChannelNumber')
    // const errorCategory = document.getElementById('errorCategory')
    // const errorCountry = document.getElementById('errorCountry')
    // const errorCountryCode = document.getElementById('errorCountryCode')
    // const errorStreamUrl = document.getElementById('errorStreamUrl')

    // if (regexName.test(name.value.trim())) {
    //     errorNom.textContent = ""
    // } else {
    //     errorNom.textContent = "Entrer un nom valid"
    //     return false;
    // }

    // if (regexChannelNumber.test(channelNumber.value.trim())) {
    //     errorChannelNumber.textContent = ""
    // } else {
    //     errorChannelNumber.textContent = "Entrer un nombre valid"
    //     return false;
    // }

    // if (regexCategory.test(category.value.trim())) {
    //     errorCategory.textContent = ""
    // } else {
    //     errorCategory.textContent = "Entrer un nom valid"
    //     return false;
    // }

    // if (regexCountry.test(country.value.trim())) {
    //     errorCountry.textContent = ""
    // } else {
    //     errorCountry.textContent = "Entrer un nom valid"
    //     return false;
    // }

    // if (regexCountryCode.test(countryCode.value.trim())) {
    //     errorCountryCode.textContent = ""
    // } else {
    //     errorCountryCode.textContent = "Entrer un nom valid"
    //     return false;
    // }

    // if (regexUrl.test(streamUrl.value.trim())) {
    //     errorStreamUrl.textContent = ""
    // } else {
    //     errorStreamUrl.textContent = "Entrer un nom valid"
    //     return false;
    // }

    if(valideForm())
        return false;

    let nextId = 0
    channels.forEach(channel => {
        if (Number(channel.id) > nextId) {
            nextId = Number(channel.id)
        }
    });


    const channel =
    {
        "id": nextId + 1,
        "channelNumber": channelNumber.value,
        "name": name.value,
        "category": category.value.toUpperCase(),
        "country": country.value,
        "countryCode": countryCode.value.toUpperCase(),
        "logo": "https://via.placeholder.com/60x60?text=NatGeo",
        "previewImage": "https://via.placeholder.com/800x450?text=NatGeo+Doc",
        "streamUrl": streamUrl.value,
        "isLive": true,
        "epg": {
            "currentProgram": "Wild Wonders (Ep. 95)",
            "startTime": "13:15",
            "endTime": "14:15",
            "progressPercentage": 79
        },
        "isFavorite": false,
        "isBlacklisted": false
    }

    const savedChannel = await addChannel(channel)

    if (savedChannel) {

        channels.push(savedChannel)
        displayChanges(channels)
        categoryShower(channels)

        return true;
    }

    return false;

}

export function valideForm() {
    const regexName = /^[A-Za-zÀ-ÿ0-9\s-]{2,30}$/;
    const regexChannelNumber = /^\d{1,6}$/;
    const regexCategory = /^[A-Za-z\s-]{4,15}$/;
    const regexCountry = /^[A-Za-zÀ-ÿ\s]{4,15}$/;
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

    let valide = true

    if (regexName.test(name.value.trim())) {
        errorNom.textContent = ""
    } else {
        errorNom.textContent = "Entrer un nom valid";
        valide = false;
    }

    if (regexChannelNumber.test(channelNumber.value.trim())) {
        errorChannelNumber.textContent = ""
    } else {
        errorChannelNumber.textContent = "Entrer un nombre valid";
        valide = false;;
    }

    if (regexCategory.test(category.value.trim())) {
        errorCategory.textContent = ""
    } else {
        errorCategory.textContent = "Entrer un nom valid";
        valide = false;
    }

    if (regexCountry.test(country.value.trim())) {
        errorCountry.textContent = ""
    } else {
        errorCountry.textContent = "Entrer un nom valid";
        valide = false;
    }

    if (regexCountryCode.test(countryCode.value.trim())) {
        errorCountryCode.textContent = ""
    } else {
        errorCountryCode.textContent = "Entrer un nom valid";
        valide = false;
    }

    if (regexUrl.test(streamUrl.value.trim())) {
        errorStreamUrl.textContent = ""
    } else {
        errorStreamUrl.textContent = "Entrer un nom valid";
        valide = false;
    }

    return valide;
}