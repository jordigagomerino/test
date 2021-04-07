const CardanocliJs = require("cardanocli-js");
const shelleyGenesisPath = "./genesis.json";

const cardanocliJs = new CardanocliJs({ era: "mary", shelleyGenesisPath });
let wallet = cardanocliJs.wallet('Ada')
let mintScript = {
    keeyHash: cardanocliJs.addressKeyHash(wallet.name)
}
let policy = cardanocliJs.transactionPolicyid(mintScript);
console.log(policy)
const BERRYCOIN = policy + '.Berrycoin';
let tx = {
    txIn: wallet.balance().utxo,
    txOut: [
        {address: wallet.paymentAddr, amount: {...wallet.balance().amount, [BERRYCOIN]: 100}}
    ],
    mint: [{action: "mint", amount: 100, token: BERRYCOIN}],
    witnessCount: 2
}
let raw = cardanocliJs.transactionBuildRaw(tx);
let signed = cardanocliJs.transactionSign(wallet, raw, mintScript);
let txHash = cardanocliJs.transactionSubmit(signed);
console.log(txHash);