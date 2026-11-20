import { getChannels } from "./api.js";
import { selectCategory, rechercheChannel, displayChanges } from "./search.js";
// import { getData } from "./storage.js";
import { categoryShower, showCategorie, playChannel, hideSpinner, popupAjouter } from "./ui.js";
// import { channelValidation } from "./validation.js"
import { editChannel } from "./edit.js"


hideSpinner()
const channels = await getChannels()
showCategorie();
popupAjouter(channels)
editChannel(channels)
categoryShower(channels)
rechercheChannel(channels)
selectCategory(channels)
// optionSelect()
displayChanges(channels)
playChannel(channels)

