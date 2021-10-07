var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        let token_date = JSON.parse(this.responseText);

        let html = "";

        token_date.tokens.forEach(function (item){
            if (item.tradable){
                html += `<option value="${item.symbol}" >${item.symbol}</option>`;
                token_images[item.symbol.toString()] = item.iconUrl;
            }

        })

        document.getElementById("from_token").innerHTML = html;
        document.getElementById("to_token").innerHTML = html;
    }
});

xhr.open("GET", "https://api.totle.com/tokens");

xhr.send(data);