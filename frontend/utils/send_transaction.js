import web3 from "../web3";

function send(transaction) {
    web3.eth.sendTransaction(transaction).on('receipt', function (receipt) {
        let title = receipt.status ? "Transaction is successful" : "Transaction failed";
        let body = receipt.from + ' to ' + receipt.to;
        let cta = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;
        console.log("Send Trxn Title", title, "body", body, "cta", cta);
    });
}

export default send;