const el = document.getElementById("goBtn");

el.addEventListener("click", (ev) => {
    const abvMin = document.getElementById("abvmin");
    const abvMax = document.getElementById("abvmax");
    const ibuMin = document.getElementById("ibumin");
    const ibuMax = document.getElementById("ibumax");
    let parent = document.querySelector("#contents");
    
    if(document.querySelector("#contents > table") != null) parent.removeChild(document.querySelector("#contents > table"));

    if(parseInt(abvMin.value) >= parseInt(abvMax.value) || parseInt(ibuMin.value) >= parseInt(ibuMax.value))
    {
        alert("Values must a range, the number on the left must be less than the number on the right.");
    }
    else {
        let link = "https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/beers/?abv=" + parseInt(abvMin.value)  + "," + parseInt(abvMax.value) + "&ibu=" + parseInt(ibuMin.value) + "," + parseInt(ibuMax.value) + "&withBreweries=Y&withIngredients=Y&key=d0614b01e50e7b715d0ea75a48dd9470";
        console.log(link);
        fetch(link)

        .then((danceparty) => danceparty.json())

        .then((d) => {
            let parent = document.querySelector("#contents");
            let table = document.createElement("table");
            table.border = 1;
            parent.append(table);

            let topRow =        document.createElement("tr");
            let name =          document.createElement("th");
            let style =         document.createElement("th");
            let abv =         document.createElement("th");
            let ibu =         document.createElement("th");
            let brewery =       document.createElement("th");
            let picture =   document.createElement("th");

            let nametx =        document.createTextNode("Name");
            let styletx =       document.createTextNode("Style");
            let abvtx =       document.createTextNode("ABV");
            let ibutx =       document.createTextNode("IBU");
            let brewerytx =     document.createTextNode("Brewery");
            let picturetx = document.createTextNode("Photo");

            name.append(nametx);
            style.append(styletx);
            abv.append(abvtx);
            ibu.append(ibutx);
            brewery.append(brewerytx);
            picture.append(picturetx);
            
            table.append(topRow);
            topRow.append(name);
            topRow.append(style);
            topRow.append(abv);
            topRow.append(ibu);
            topRow.append(brewery);
            topRow.append(picture);

            for(i = 0; i < d.data.length; i++)
            {
                let row = document.createElement("tr");
                let namer = document.createElement("td");
                let styler = document.createElement("td");
                let abvr = document.createElement("td");
                let ibur = document.createElement("td");
                let breweryr = document.createElement("td");
                let picr = document.createElement("td");

                let picturer = document.createElement("img");
                picr.append(picturer);

                namer.append(document.createTextNode(d.data[i].nameDisplay));
                styler.append(document.createTextNode(d.data[i].style.name));
                abvr.append(document.createTextNode(d.data[i].abv));
                ibur.append(document.createTextNode(d.data[i].ibu));
                breweryr.append(document.createTextNode(d.data[i].breweries[0].name));
                try{picturer.setAttribute("src", d.data[i].labels.medium);}
                catch{
                    try{picturer.setAttribute("src", d.data[i].breweries[0].images.medium != null);}
                    catch{};
                    picturer.setAttribute("src", "noImage.png");
                }
                table.append(row);
                row.append(namer);
                row.append(styler);
                row.append(abvr);
                row.append(ibur);
                row.append(breweryr);
                row.append(picr);
            
            }
            console.log("Got some data", d);
        });
    }
});