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
            "hover:bg-gray-200"
        );

        categoriesList.appendChild(eachCategory)
    });
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
        <svg id="favorite" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white fill-current cursor-pointer hover:text-yellow-400" viewBox="0 0 24 24">
<path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!--Black-list-->
<svg id="black-list" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white fill-current cursor-pointer hover:text-red-500" viewBox="0 0 32 32" version="1.1">
<title>interdiction</title>
<path d="M23.593 2.944c-7.307-4.219-16.65-1.715-20.869 5.592s-1.715 16.65 5.592 20.869 16.65 1.715 20.869-5.592 1.715-16.65-5.592-20.869zM21.848 5.96c5.177 2.989 7.232 9.307 5.023 14.688l-15.391-15.391c3.261-1.331 7.081-1.194 10.368 0.703zM10.047 26.401c-5.178-2.99-7.233-9.311-5.021-14.693l15.394 15.394c-3.263 1.333-7.085 1.198-10.373-0.701zM23.229 25.471l-16.571-16.571c0.596-0.763 1.273-1.436 2.012-2.014l16.57 16.57c-0.596 0.763-1.273 1.436-2.011 2.015z"/>
</svg>

<!--Edit-->
<svg id="edit" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white fill-none stroke-current stroke-[1.8] cursor-pointer hover:text-blue-500" viewBox="0 0 24 24"
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
        channelsCard.append(card)
    });
}

// data.forEach(element => {
//     channelsCard.innerHTML += `
//     <div
//         class="card-channels bg-gray-800 border border-gray-700 p-2 flex items-center rounded-lg my-2 hover:-translate-y-1 transition duration-300 shadow-md"
//       >
//         <img
//           src="${element.logo}"
//           alt=""
//           class="w-16 h-16 bg-white rounded-lg p-1 object-contain"
//         />
//         <div class="p-2 min-w-0 flex-1">
//           <h1 class="font-bold text-white">${element.name}</h1>
//           <h2 class="text-xs text-gray-400 mt-1">${element.category}</h2>
//         </div>
//       </div>
//     `
// });

export function playChannel(channels) {
    const channelsCard = document.getElementById("channels-card")
    if (!channelsCard) return

    const selectedChannel = channels.find(
        channel => channel.id === "1"
    );
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

        document.querySelectorAll(".card-channels").forEach(card => {
            card.classList.remove("bg-blue-900", "border-2", "border-blue-500")
        });

        selectedCard.classList.add("bg-blue-900", "border-2", "border-blue-500")

        const channelId = selectedCard.dataset.channelId;

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
    }, 1500)
}

export function optionSelect() {
    const channelsCard = document.getElementById("channels-card")
    if (!channelsCard) return;
    channelsCard.addEventListener("click", (e) => {
        const selectedIcon = e.target.closest("svg")
        console.log(selectedIcon, "button cliqué")
        selectedIcon.classList.add("text-yellow-400")
    })
}
