import { handleError } from "./error.js";
import { showError } from "./ui.js";

const API_URL = 'https://6af34a88d2377d6c3704d78c.mockapi.io/channels'
export async function getChannels() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            showError(res)
            await handleError(res)
            // await cz handleError is async 
        }
        const data = await res.json();
        // console.log(data)
        return data;
    }
    catch (error) {
        console.error(`hafla`,error)
        // "throw" so we stop the code and not give undefinned channels's variable in app.js
        throw error; 
    }
}


export async function setChannelFavorite(channelId, status) {
    try {
        const res = await fetch(`${API_URL}/${channelId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFavorite: status })
        });

        if(!res.ok){
            await handleError(res)
        }
        const channel = await res.json();
        console.log(channel)
        return channel

    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function setChannelBlackListed(channelId, status) {
    try {
        const res = await fetch(`${API_URL}/${channelId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isBlacklisted: status, isFavorite : false })
        });

        if(!res.ok){
            await handleError(res)
        }
        const channel = await res.json();
        console.log(channel)
        return channel

    } catch (error) {
        console.error(error)
        throw error;
    }
}

// export async function deleteChannel(channelId){
//     try{
//         const res = await fetch(`${API_URL}/${channelId}`, {
//             method : "DELETE",
//             header : { "Content-Type": "application/json"},
//         })
//     }
// }
