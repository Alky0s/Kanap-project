class Item{
    constructor(jsonItem){
        jsonItem && Object.assign(this, jsonItem);

    }
}