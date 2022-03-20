
async function GetGood() {
    const response = await fetch("/api/electronicmodel", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok == true) {
        const goods = await response.json();

        let rows = document.querySelector("tbody");
        goods.forEach(good => {
            // добавляем полученные элементы в таблицу
            rows.append(row(good));
        });
    }
}
async function GetGoodbyId(id) {
    const response = await fetch("/api/electronicmodel/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok == true) {
        const good = await response.json();
        const form = document.forms["electronicForm"];
        form.elements["id"].value = good.id;
        form.elements["goodName"].value = good.name;
        form.elements["goodType"].value = good.type;
        form.elements["goodManufacturer"].value = good.manufacturer;
        form.elements["priceTB"].value = good.price;


    }
}

async function CreateGood(goodname, goodtype, goodman, goodprice) {
    if (goodname == "") {
        alert("Введите хотя бы наименование товара!");
        return;
    }
    
    const response = await fetch("api/electronicmodel", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({

            name: goodname,
            type: goodtype,
            manufacturer: goodman,
            price: parseInt(goodprice)
        })
    });
    if (response.ok === true) {
        const good = await response.json();
        reset();
        document.querySelector("tbody").append(row(good));
    }
}
async function EditGood(id, goodname, goodtype,goodman, goodprice) {
    if (goodname == "") {
        alert("Введите хотя бы имя клиента!");
        return;
    }
    const response = await fetch("/api/electronicmodel/" + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(id, 10),
            name: goodname,
            type: goodtype,
            manufacturer: goodman,
            price: parseInt(goodprice)
        })
    });
    if (response.ok === true) {
        const good = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + good.id +
            "']").replaceWith(row(good));
    }
}
async function DeleteGood(id) {
    const response = await fetch("/api/electronicmodel/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const good = await response.json();
        document.querySelector("tr[data-rowid='" + good.id + "']").remove();
        
    }
}
function reset() {
    const form = document.forms["electronicForm"];
    form.reset();
    form.elements["id"].value = 0;
}
function row(good) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", good.id);
    const idTd = document.createElement("td");
    idTd.append(good.id);
    tr.append(idTd);
    const nameTd = document.createElement("td");
    nameTd.append(good.name);
    tr.append(nameTd);
    const goodType = document.createElement("td");
    goodType.append(good.type);
    tr.append(goodType);
    const goodman = document.createElement("td");
    goodman.append(good.manufacturer);
    tr.append(goodman);
    const price = document.createElement("td");
    price.append(good.price+" руб.");
    tr.append(price);
    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", good.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetGoodbyId(good.id);

    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", good.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteGood(good.id);

    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;

}
function InitialFunction() {
    //сброс значений формы
    document.getElementById("reset").addEventListener("click", e => {
        e.preventDefault();
        reset();
    });
    
    document.getElementById("saveBTN").addEventListener("click", e => {
        e.preventDefault();
        const form = document.forms["electronicForm"];
        const id = form.elements["id"].value;
        const goodNameTB = form.elements["goodName"].value;
        const goodTypeTB = form.elements["goodType"].value;
        const goodManufacturerTB = form.elements["goodManufacturer"].value;
        const priceTB = form.elements["priceTB"].value;
        if (id == 0)
            CreateGood(goodNameTB, goodTypeTB, goodManufacturerTB, priceTB);
        else
            EditGood(id, goodNameTB, goodTypeTB, goodManufacturerTB, priceTB);
    });

    // отправка формы
    document.forms["electronicForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["electronicForm"];
        const id = form.elements["id"].value;
        const goodNameTB = form.elements["goodName"].value;
        const goodTypeTB = form.elements["goodType"].value;
        const goodManufacturerTB = form.elements["goodManufacturer"].value;
        const priceTB = form.elements["priceTB"].value;
        if (id == 0)
            CreateGood(goodNameTB, goodTypeTB, goodManufacturerTB, priceTB);
        else
            EditGood(id, goodNameTB, goodTypeTB, goodManufacturerTB, priceTB);
    });
    GetGood();
}