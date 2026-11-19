import { rendre } from "./ui.js";

let categorieNom = "TOUTES CATÉGORIES"
let chercheValure = ""

export function selectCategory(channels) {
    const categoriesSelect = document.getElementById('categorie-bar')
    const favoriteOption = document.getElementById('favorite-option')
    const blacklistOption = document.getElementById('black-option')

    categoriesSelect.addEventListener('click', (e) => {
        const selectedCategory = e.target.closest(".categories-item")
        if (!selectedCategory) return;

        categorieNom = selectedCategory.textContent;

        displayChanges(channels);
    });

    if (favoriteOption) {
        favoriteOption.addEventListener('click', () => {
            categorieNom = "FAVORITE"
            displayChanges(channels);
        });
    };

    if(blacklistOption){
        blacklistOption.addEventListener('click', () =>{
            categorieNom = "BLACK LIST"
            displayChanges(channels)
        });
    };
}

export function rechercheChannel(channels) {
    const searchBar = document.getElementById("search-bar")

    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
        chercheValure = e.target.value.toLowerCase().trim()

        displayChanges(channels)
    })
}

export function displayChanges(channels) {
    let channelsFilter = channels;

    if(categorieNom === "BLACK LIST"){
        channelsFilter = channelsFilter.filter(
            channel => channel.isBlacklisted === true
        );
    }

    else if(categorieNom === "FAVORITE"){
        channelsFilter = channelsFilter.filter(
            channel => channel.isFavorite === true && !channel.isBlacklisted
        );
    }

    else if (categorieNom == "TOUTES CATÉGORIES") {
        channelsFilter = channelsFilter.filter(
            channel => !channel.isBlacklisted
        );
    }

    else {
        channelsFilter = channelsFilter.filter(
            channel => channel.category === categorieNom && !channel.isBlacklisted
        )
    }

    channelsFilter = channelsFilter.filter(channel =>

        channel.name.toLowerCase().includes(chercheValure) ||
        channel.category.toLowerCase().includes(chercheValure) ||
        channel.country.toLowerCase().includes(chercheValure) ||
        String(channel.channelNumber).toLocaleLowerCase().includes(chercheValure)
    );



    rendre(channelsFilter)
}