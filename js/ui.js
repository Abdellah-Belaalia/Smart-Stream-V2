import { deleteChannel, setChannelBlackListed, setChannelFavorite } from "./api.js";
import { displayChanges } from "./search.js";
import { createChannel } from "./validation.js";

export function showCategorie() {
    const categorieBtn = document.getElementById("categorie-btn");
    const background = document.getElementById("background")
    const categorieBar = document.getElementById("categorie-bar");
    const buttonClose = document.getElementById("button-close");
    const hoverZone = document.getElementById("hover-zone")

    if (!categorieBtn || !background || !categorieBar || !buttonClose || !hoverZone) return;



    function openBar() {
        categorieBar.classList.remove("-left-64")
        categorieBar.classList.add("left-0")
        background.classList.remove("hidden")
    }
    function closeBar() {
        categorieBar.classList.add("-left-64")
        categorieBar.classList.remove("left-0")
        background.classList.add("hidden")
    }

    hoverZone.addEventListener('mouseenter', openBar);

    categorieBtn.addEventListener('click', () => {
        if (categorieBar.classList.contains("-left-64")) {
            openBar()
        } else {
            closeBar()
        }
    })

    buttonClose.addEventListener("click", closeBar);
    background.addEventListener("click", closeBar)
}

function getCategories(channels) {
    const categories = channels.map(channel => channel.category)
    const uniqueCategorie = categories.filter((category, index) => {
        return categories.indexOf(category) === index
    });
    return ["TOUTES CATÉGORIES", ...uniqueCategorie]

}


export function categoryShower(channels) {
    const categoriesList = document.getElementById('categories-list')
    if (!categoriesList) return;
    categoriesList.innerHTML = "";

    const categorie = getCategories(channels)

    categorie.forEach(category => {
        const eachCategory = document.createElement("div")
        eachCategory.textContent = category;
        eachCategory.classList.add(
            "categories-item",
            "p-2",
            "rounded-lg",
            "hover:bg-gray-200",
        );

        categoriesList.appendChild(eachCategory)
    });
}

function blacklistedChannels(element) {

    const card = document.createElement('div')

    card.dataset.channelId = element.id;

    card.classList.add(
        "card-channels",
        "bg-gray-800",
        "border",
        "p-2",
        "flex",
        "items-center",
        "gap-2",
        "rounded-lg",
        "my-2",
        "shadow-md"
    )

    const img = document.createElement("img")

    img.src = element.logo;
    img.alt = element.name;

    img.classList.add(
        "w-16",
        "h-16",
        "bg-white",
        "rounded-lg",
        "p-1",
        "object-contain"
    )

    const div = document.createElement("div");

    div.innerHTML = `
            <!--Delete-icon-->
            <svg data-action="delete" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white stroke-current fill-current cursor-pointer hover:text-red-500" viewBox="0 0 24 24">
<path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!--Black-list-->
<svg data-action="black-list" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ${element.isBlacklisted ? 'text-red-500' : 'text-white'} fill-current cursor-pointer hover:text-red-500" viewBox="0 0 32 32" version="1.1">
<title>interdiction</title>
<path d="M23.593 2.944c-7.307-4.219-16.65-1.715-20.869 5.592s-1.715 16.65 5.592 20.869 16.65 1.715 20.869-5.592 1.715-16.65-5.592-20.869zM21.848 5.96c5.177 2.989 7.232 9.307 5.023 14.688l-15.391-15.391c3.261-1.331 7.081-1.194 10.368 0.703zM10.047 26.401c-5.178-2.99-7.233-9.311-5.021-14.693l15.394 15.394c-3.263 1.333-7.085 1.198-10.373-0.701zM23.229 25.471l-16.571-16.571c0.596-0.763 1.273-1.436 2.012-2.014l16.57 16.57c-0.596 0.763-1.273 1.436-2.011 2.015z"/>
</svg>
            `
    div.classList.add(
        "icons-section",
        "flex",
        "flex-col",
        "items-center",
        "shrink-0",
        "gap-3"
    )


    const content = document.createElement('div')

    content.classList.add(
        "p-2",
        "min-w-0",
        "flex-1"
    )

    const title = document.createElement('h1')

    title.textContent = element.name
    title.classList.add(
        "font-bold",
        "text-white"
    )

    const categorie = document.createElement('p')

    categorie.textContent = element.category
    categorie.classList.add(
        "text-xs",
        "text-gray-400",
        "mt-1"
    )
    const country = document.createElement('p')

    country.textContent = element.country
    country.classList.add(
        "text-xs",
        "text-gray-400",
        "mt-1"
    )

    const number = document.createElement('p')

    number.textContent = element.channelNumber
    number.classList.add(
        "text-xs",
        "text-gray-400",
        "mt-1"
    )

    content.append(title, categorie, country, number);
    card.append(img, content, div);

    return card

}

function createCard(element) {
    const card = document.createElement('div')

    card.dataset.channelId = element.id;

    card.classList.add(
        "card-channels",
        "bg-gray-800",
        "border",
        "p-2",
        "flex",
        "items-center",
        "gap-2",
        "rounded-lg",
        "my-2",
        "shadow-md"
    )

    const img = document.createElement("img")

    img.src = element.logo;
    img.alt = element.name;

    img.classList.add(
        "w-16",
        "h-16",
        "bg-white",
        "rounded-lg",
        "p-1",
        "object-contain"
    )

    const div = document.createElement("div");

    div.innerHTML = `
        <!--Favorite-->
        <svg data-action="favorite" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ${element.isFavorite ? 'text-yellow-400' : 'text-white'} fill-current cursor-pointer hover:text-yellow-400" viewBox="0 0 24 24">
<path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!--Black-list-->
<svg data-action="black-list" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ${element.isBlacklisted ? 'text-red-500' : 'text-white'} fill-current cursor-pointer hover:text-red-500" viewBox="0 0 32 32" version="1.1">
<title>interdiction</title>
<path d="M23.593 2.944c-7.307-4.219-16.65-1.715-20.869 5.592s-1.715 16.65 5.592 20.869 16.65 1.715 20.869-5.592 1.715-16.65-5.592-20.869zM21.848 5.96c5.177 2.989 7.232 9.307 5.023 14.688l-15.391-15.391c3.261-1.331 7.081-1.194 10.368 0.703zM10.047 26.401c-5.178-2.99-7.233-9.311-5.021-14.693l15.394 15.394c-3.263 1.333-7.085 1.198-10.373-0.701zM23.229 25.471l-16.571-16.571c0.596-0.763 1.273-1.436 2.012-2.014l16.57 16.57c-0.596 0.763-1.273 1.436-2.011 2.015z"/>
</svg>

<!--Edit-->
<svg data-action="edit" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white fill-none stroke-current stroke-[1.8] cursor-pointer hover:text-blue-500" viewBox="0 0 24 24"
stroke-linecap="round"
stroke-linejoin="round">
<path d="M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L12 6.43872M19.9213 9.63993L14.6607 14.9006L11.5613 18L11.4001 18.1612C10.8229 18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407 20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584 21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445 20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021M2.32181 19.8021L3.41556 16.5208C3.67368 15.7465 3.80273 15.3593 3.97634 14.995C4.18114 14.5653 4.43213 14.1592 4.7249 13.7838C4.97308 13.4656 5.26166 13.1771 5.83882 12.5999L8.5 9.93872"/>
</svg>
`
    div.classList.add(
        "icons-section",
        "flex",
        "flex-col",
        "items-center",
        "shrink-0",
        "gap-3"
    )


    const content = document.createElement('div')

    content.classList.add(
        "p-2",
        "min-w-0",
        "flex-1"
    )

    const title = document.createElement('h1')

    title.textContent = element.name
    title.classList.add(
        "font-bold",
        "text-white"
    )

    const categorie = document.createElement('p')

    categorie.textContent = element.category
    categorie.classList.add(
        "text-xs",
        "text-gray-400",
        "mt-1"
    )
    const country = document.createElement('p')

    country.textContent = element.country
    country.classList.add(
        "text-xs",
        "text-gray-400",
        "mt-1"
    )

    const number = document.createElement('p')

    number.textContent = element.channelNumber
    number.classList.add(
        "text-xs",
        "text-gray-400",
        "mt-1"
    )

    content.append(title, categorie, country, number);
    card.append(img, content, div);

    return card
}

export function rendre(data) {
    const channelsCard = document.getElementById("channels-card")
    if (!channelsCard) return;
    channelsCard.innerHTML = ""

    if (data.length === 0) {
        channelsCard.textContent = "No channels found";
        return
    }

    data.forEach(element => {
        if (element.isBlacklisted) {
            channelsCard.append(blacklistedChannels(element))
        }
        else {
            channelsCard.append(createCard(element))
        }
    });
}

export function playChannel(channels) {
    const channelsCard = document.getElementById("channels-card")
    if (!channelsCard) return



    const selectedChannel = channels.find(
        channel => !channel.isBlacklisted
    );

    if(!selectedChannel) return;

    const videoPlayer = document.getElementById("player-video")
    if (!videoPlayer) return

    document.getElementById('channels-selected').textContent = selectedChannel.name
    document.getElementById('channel-number').textContent = selectedChannel.channelNumber
    document.getElementById('country-code').textContent = selectedChannel.countryCode


    document.getElementById('epg-program').textContent = selectedChannel.epg.currentProgram
    document.getElementById("epg-start").textContent = selectedChannel.epg.startTime
    document.getElementById("epg-end").textContent = selectedChannel.epg.endTime
    document.getElementById('epg-progress').style.width = `${selectedChannel.epg.progressPercentage}%`

    videoPlayer.src = selectedChannel.streamUrl;
    videoPlayer.load()

    videoPlayer.play()




    channelsCard.addEventListener("click", (e) => {
        const selectedCard = e.target.closest(".card-channels")

        if (!selectedCard) return;

        const channelId = selectedCard.dataset.channelId;


        const btnAction = e.target.closest("[data-action]");

        if (btnAction) {

            const choix = btnAction.dataset.action

            if (choix === "favorite") {
                const choosedChannel = channels.find(
                    channel => channel.id === channelId
                );
                const newStatus = !choosedChannel.isFavorite
                console.log("choosed", choosedChannel, "new", newStatus);

                /* ! meaning
                if(choosedChannel.isFavorite == false){
                    choosedChannel.isFavorite = true 
                } else {
                    chooserdChannels.isFavorite = false
                }
                */


                choosedChannel.isFavorite = newStatus
                setChannelFavorite(channelId, newStatus)
                displayChanges(channels)
            }

            if (choix === "black-list") {
                const choosedChannel = channels.find(
                    channel => channel.id === channelId
                );


                const newStatus = !choosedChannel.isBlacklisted
                console.log("choosed", choosedChannel, "new", newStatus);

                choosedChannel.isFavorite = false
                choosedChannel.isBlacklisted = newStatus
                setChannelBlackListed(channelId, newStatus)
                displayChanges(channels)
            }

            if (choix === "delete") {
                const choosedChannel = channels.find(
                    channel => channel.id === channelId
                )

                const confirmation = confirm(`Voulez vous supprimer cette chaîne ${choosedChannel.name} ?`)

                if (!confirmation) return

                const channelIndex = channels.findIndex(
                    channel => channel.id === channelId
                )

                if (channelIndex !== -1) {
                    channels.splice(channelIndex, 1)
                    deleteChannel(channelId)
                    displayChanges(channels)
                    categoryShower(channels)
                }
            }

            return;
        }

        document.querySelectorAll(".card-channels").forEach(card => {
            card.classList.remove("bg-blue-900", "border-2", "border-blue-500")
        });

        selectedCard.classList.add("bg-blue-900", "border-2", "border-blue-500")


        const selectedChannel = channels.find(
            channel => channel.id === channelId
        );

        document.getElementById('channels-selected').textContent = selectedChannel.name
        document.getElementById('channel-number').textContent = selectedChannel.channelNumber
        document.getElementById('country-code').textContent = selectedChannel.countryCode


        document.getElementById('epg-program').textContent = selectedChannel.epg.currentProgram
        document.getElementById("epg-start").textContent = selectedChannel.epg.startTime
        document.getElementById("epg-end").textContent = selectedChannel.epg.endTime
        document.getElementById('epg-progress').style.width = `${selectedChannel.epg.progressPercentage}%`


        const videoPlayer = document.getElementById("player-video")
        if (!videoPlayer) return

        videoPlayer.src = selectedChannel.streamUrl;
        videoPlayer.load()

        videoPlayer.play().catch(error => {
            console.log("MarBA7nach", error)
        })
    })
}


export function hideSpinner() {
    const loader = document.getElementById("page-loader")
    if (!loader) return;
    setTimeout(() => {
        loader.classList.add("hidden")
    }, 3100)
}


export function showError(res) {
    let message = ""

    if (res.status == 404) {
        message = "blabla"
    }

    if (res.status == 500) {
        message = "Server Blalabla"
    }

    const errorMsg = document.getElementById('error-msg')

    const popup = document.createElement('div')

    popup.classList.add(
        "bg-red-500",
        "font-bold",
        "border",
        "rounded-lg",
        "text-white",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-6",
        "p-10",
        "fixed",
        "w-96",
        "h-80",
        "left-80",
        "top-50"
    )

    popup.textContent = message;

    const btnFermer = document.createElement('button');

    btnFermer.textContent = "Close"

    btnFermer.classList.add(
        "bg-white",
        "text-red-500",
        "rounded",
        "p-2",
        "font-bold"
    )

    btnFermer.addEventListener('click', () => {
        popup.remove()
    })

    popup.append(btnFermer)

    errorMsg.append(popup)

}

export function creationPopup() {
    const popup = document.createElement('div')

    popup.classList.add(
        "popup-ajouter",
        "fixed",
        "inset-0",
        "bg-black",
        "flex",
        "items-center",
        "justify-center",
        "z-50"
    )

    popup.innerHTML = `
        <form id="form-ajouter" class="flex flex-col w-fit gap-3 p-6 bg-blue-600 border border-white rounded-xl text-white">
                  <h2 class="text-xl font-bold mb-2">
                    Ajouter une chaîne
                  </h2>
                  <input type="text" id="name" placeholder="Nom de chaîne" class="p-2 rounded bg-blue-950 border border-white">
                  <p id="errorNom" class="text-red-500"></p>
                  <input type="text" id="channelNumber" name="channelNumber" placeholder="Numéro" class="p-2 rounded bg-blue-950 border border-white">
                  <p id="errorChannelNumber" class="text-red-500"></p>
                  <input type="text" id="category" name="category" placeholder="Categorie" class="p-2 rounded bg-blue-950 border border-white">
                  <p id="errorCategory" class="text-red-500"></p>
                  <input type="text" id="country" name="country" placeholder="Pays (ex: Maroc)" class="p-2 rounded bg-blue-950 border border-white">
                  <p id="errorCountry" class="text-red-500"></p>
                  <input type="text" id="countryCode" name="countryCode" placeholder="Code country (ex: MA)" class="p-2 rounded bg-blue-950 border border-white">
                  <p id="errorCountryCode" class="text-red-500"></p>
                  <input type="text" id="streamUrl" name="streamUrl" placeholder="Lien de stream" class="p-2 rounded bg-blue-950 border border-white">
                  <p id="errorStreamUrl" class="text-red-500"></p>

                  <div>
                    <button type="submit" class="px-4 py-2 rounded bg-blue-950 hover:bg-blue-700">Ajouter</button>
                    <button type="button" id="btn-annuler" class="px-4 py-2 rounded bg-blue-950 hover:bg-blue-700">Annuler</button>
                  </div>
                  
                </form>
        `;

    document.body.appendChild(popup)

    return popup;

}

export function popupAjouter(channels) {
    const ajouterBtn = document.getElementById('button-ajouter')

    if (!ajouterBtn) return;

    ajouterBtn.addEventListener('click', () => {

        const popup = creationPopup();

        const btnAnnuler = document.getElementById('btn-annuler')

        btnAnnuler.addEventListener('click', () => {
            popup.remove()
        });

        const form = document.getElementById('form-ajouter')

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isAdded = await createChannel(channels);

            if(isAdded){
                form.reset();
                popup.remove();
            }
        })
    });
}


