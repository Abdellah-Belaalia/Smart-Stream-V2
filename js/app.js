import { getChannels } from "./api.js";
import { selectCategory, rechercheChannel, displayChanges } from "./search.js";
// import { getData } from "./storage.js";
import { categoryShower, showCategorie, playChannel, hideSpinner, popupAjoute } from "./ui.js";


hideSpinner()
const channels = await getChannels()
showCategorie();
popupAjoute()
categoryShower(channels)
rechercheChannel(channels)
selectCategory(channels)
// optionSelect()
displayChanges(channels)
playChannel(channels)

