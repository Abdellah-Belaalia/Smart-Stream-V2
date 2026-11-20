import { creationPopup } from "./ui.js"
export function editChannel(channels) {

    const channelsCard = document.getElementById("channels-card")

    if (!channelsCard) return

    channelsCard.addEventListener("click", (e) => {
        const selectedCard = e.target.closest(".card-channels")

        if (!selectedCard) return;

        const channelId = selectedCard.dataset.channelId;


        const btnAction = e.target.closest("[data-action]");

        if (btnAction) {

            const choix = btnAction.dataset.action

            if (choix === "edit") {

                const popup = creationPopup();

                const btnAnnuler = document.getElementById('btn-annuler')

                btnAnnuler.addEventListener('click', () => {
                    popup.remove()
                });

                const choosedChannel = channels.find(
                    channel => channel.id === channelId
                );

                const name = document.getElementById('name')
                const channelNumber = document.getElementById('channelNumber')
                const category = document.getElementById('category')
                const country = document.getElementById('country')
                const countryCode = document.getElementById('countryCode')
                const streamUrl = document.getElementById('streamUrl')


                name.value = choosedChannel.name
                channelNumber.value = choosedChannel.channelNumber
                category.value = choosedChannel.category
                country.value = choosedChannel.country
                countryCode.value = choosedChannel.countryCode
                streamUrl.value = choosedChannel.streamUrl

                
            }
        }
    })

}

// const form = document.getElementById('form-ajouter')

//         form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             createChannel();

//             form.reset();
//             popup.remove();
//         })