import { data } from "./periodictable.js";

function find_element_on_data(element_symbol){
    return data.find(elem => elem.symbol === element_symbol);
}

async function teste(){
    //let radius = cation_info.ionRadius.slice(-3, -1);
    let cation = find_element_on_data(document.getElementById("cation").value);
    let anion = find_element_on_data(document.getElementById("anion").value);
}

