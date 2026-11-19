export async function handleError(res){
    if(!res.ok){
        throw new Error("Something went wrong!")
    }
    if(res.status == 404){
        throw new Error("Channels not found!")
    }
    if(res.status === 403 || res.status === 429){
        throw new Error("Limite de requête atteinte. Réssayez plus tard.")
    }
    if(res.status == 500){
        throw new Error("Server error. Please try again later!", res.status)
    }
}