export function getFromStrorage(key){
    if(!key){
        return null;
    }

    try{
        const valueStr = localStorage.getItem(key);
        if(valueStr){
            return JSON.parse(valueStr);
        }else{
            console.log('Local storage for this key is empty!');
            return null;
        }
    }catch(err){
        console.log('Error getting data from local storage: ' + err);
        return null;
    }
}

export function setInStorage(key, obj){
    if(!key){
        console.error('Error: key for setting object in local storage is missing');
    }

    try {
        if(!obj)
            console.log('Error: empty object passed to local storage');
        else
            localStorage.setItem(key, JSON.stringify(obj))
    }catch(err){
        console.log('Error happened while setting object to the local storage');
    }
}