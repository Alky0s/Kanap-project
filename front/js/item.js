class Items{
    constructor(jsonItem){
        jsonItem && Object.assign(this, jsonItem);
    }
}


const urlData = window.location.search;

const search_params = new URLSearchParams(urlData);
const url_id = search_params.get("id");
