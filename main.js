function request_API(element_name){
    return new Request('https://periodic-table-elements-info.herokuapp.com/element/symbol/'+element_name);
}

async function get_Element_JSON(element){
    return await fetch(request_API(element)).then(response => response.json()).then(json =>{
        return json[0];
    });
}
async function get_Cation_Info(){
     return await get_Element_JSON(document.getElementById('cation').value);
 }

async function get_Anion_Info(){
    return await get_Element_JSON(document.getElementById('anion').value);
}

async function teste(){
    let cation_info = await get_Cation_Info();
    let radius = cation_info.ionRadius.slice(-3, -1);
    console.log(radius);
    console.log(get_Cation_Info());
    console.log(get_Anion_Info());
}