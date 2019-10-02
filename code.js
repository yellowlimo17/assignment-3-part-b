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
        let link = "http://api.brewerydb.com/v2/beers/?abv=" + parseInt(abvMin.value)  + "," + parseInt(abvMax.value) + "&ibu=" + parseInt(ibuMin.value) + "," + parseInt(ibuMax.value) + "&withBreweries=Y&withIngredients=Y&key=d0614b01e50e7b715d0ea75a48dd9470";
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
            let phone =         document.createElement("th");
            phone.classList.add("colN");
            let birth =         document.createElement("th");
            birth.classList.add("colN");
            let picture =       document.createElement("th");
            picture.classList.add("colN");
            let nationality =   document.createElement("th");
            nationality.classList.add("colN");
            let nametx =        document.createTextNode("Name");
            let phonetx =       document.createTextNode("Cell Phone");
            let birthtx =       document.createTextNode("Date of Birth");
            let picturetx =     document.createTextNode("Picture");
            let nationalitytx = document.createTextNode("Nationality");
            name.append(nametx);
            phone.append(phonetx);
            birth.append(birthtx);
            picture.append(picturetx);
            nationality.append(nationalitytx);
            table.append(topRow);
            topRow.append(name);
            topRow.append(phone);
            topRow.append(birth);
            topRow.append(picture);
            topRow.append(nationality);

            for(i = 0; i < d.results.length; i++)
            {
                let row = document.createElement("tr");
                let namer = document.createElement("td");
                let phoner = document.createElement("td");
                phoner.classList.add("colN");
                let birthr = document.createElement("td");
                birthr.classList.add("colN");
                let pic = document.createElement("td");
                pic.classList.add("colN");
                let natpic = document.createElement("td");
                natpic.classList.add("colN");
                let picturer = document.createElement("img");
                let nationalityr = document.createElement("img");
                pic.append(picturer);
                natpic.append(nationalityr);

                namer.append(document.createTextNode(d.results[i].name.first + " " + d.results[i].name.last));
                phoner.append(document.createTextNode(d.results[i].phone));
                birthr.append(document.createTextNode(d.results[i].dob.date.slice(5,7) + "." + d.results[i].dob.date.slice(8,10) + "." + d.results[i].dob.date.slice(0,4)));
                picturer.setAttribute("src", d.results[i].picture.thumbnail);
                nationalityr.setAttribute("src", "https://www.countryflags.io/" + d.results[i].nat + "/shiny/64.png")

                table.append(row);
                row.append(namer);
                row.append(phoner);
                row.append(birthr);
                row.append(pic);
                row.append(natpic);
            
            }
            console.log("Got some data", d);
        });
    }
});