import Request from 'request';

export default {
    "getTransactions": () => {
        Request({
            uri: "https://www.imona.com/platform/rest/service/bankapi/creditCardMovements?cardNo=2222",
            json: true,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            }
        }, function (err, response) {
            console.log(JSON.stringify(response.body));
        });
    },
    "createTransaction": (amount) => {
        Request({
            uri: "https://www.imona.com/platform/rest/service/bankapi/moneytransfer",
            json: true,
            method: 'POST',
            body: {
                "fromaccountno": "12345",
                "toaccountno": "34567",
                "amount": amount.toString(),
                "description": "aciklamasi"
            },
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            }
        }, function (err, response) {
            console.log(JSON.stringify(response.body));
        });
    },
    "getAccounts": () => {
        Request({
            uri: "https://www.imona.com/platform/rest/service/bankapi/getAllAccounts",
            json: true,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            },
            body: {
                "accountNumber": 5555
            }
        }, function (err, response) {
        });
    },
    "getCards": () => {
        Request({
            uri: "https://www.imona.com/platform/rest/service/bankapi/creditCardListAndBalance?customerID=1111",
            json: true,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            },
            body: {
                "accountNumber": 5555
            }
        }, function (err, response) {
            console.log(JSON.stringify(response.body));
        });
    }
}
