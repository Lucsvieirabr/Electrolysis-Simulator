function request_API(element_name){
    return new Request('https://periodic-table-elements-info.herokuapp.com/element/symbol/'+element_name);
}
async function get_API_JSON(){
    return await fetch(request_API()).then(response => response.json()).then(json =>{
        return json;
    });
}
async function teste(){
    return await get_API_JSON();
}
let periodicTable = teste();
console.log(periodicTable);