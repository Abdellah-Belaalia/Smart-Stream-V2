import { getChannels } from "./api.js";
import { selectCategory, rechercheChannel } from "./search.js";
// import { getData } from "./storage.js";
import { categoryShower, showCategorie, rendre, playChannel, hideSpinner, optionSelect } from "./ui.js";

hideSpinner()
const channels = await getChannels()
showCategorie();

categoryShower(channels)
rechercheChannel(channels)
selectCategory(channels)
optionSelect()
rendre(channels);
playChannel(channels)

