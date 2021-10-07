function getBuyData(){
        let appkey = "4db92141-6093-4445-b4be-407b088ada28" ;
        let partnerContract = "0x24411396debc59484b1daddc8684cd776764da28" ;
        let sourceAsset = document.getElementById("from_token").value;
        let sourceAmount = parseInt( document.getElementById("sell").value +"000000" || 0 );
        let destinationAsset = document.getElementById("to_token").value ;


        document.getElementById("fast_token").innerHTML = sourceAsset  ;
        document.getElementById("second_token").innerHTML = destinationAsset  ;


        document.getElementById("loading_image").style.display = "block";



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "apiKey": appkey,
            "partnerContract": partnerContract,
            "config":{
                "skipBalanceChecks":true,
                "transactions": false,
                "strategy":{
                    "backup":"curves",
                    "main":"curves"
                }
            },
            "swaps": [
                {
                    "sourceAsset": sourceAsset,
                    "sourceAmount": sourceAmount,
                    "destinationAsset": destinationAsset,
                    "maxExecutionSlippagePercent":3
                }
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.totle.com/swap", requestOptions)
            .then(response => response.text())
            .then(result => {

                document.getElementById("loading_image").style.display = "none";
                
                let response_data = JSON.parse(result);
                response_data.response.summary.forEach(function (item){
                    document.getElementById("buy").value = item.destinationAmount;
                    document.getElementById("amount").innerText = item.destinationAmount;
                    document.getElementById("rate_text").innerText = item.rate;


                    document.getElementById("from_path_txt").innerText = sourceAsset;
                    document.getElementById("from_path_img").src = token_images[sourceAsset.toString()];

                    document.getElementById("to_path_txt").innerText = destinationAsset;
                    document.getElementById("to_path_img").src = token_images[destinationAsset.toString()];
                })
            })
            .catch(error => console.log('error', error));

    }