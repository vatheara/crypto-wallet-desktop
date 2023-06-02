import { Wallet } from "ethers";

// const newWallet = Wallet.createRandom();

const newWallet = Wallet.createRandom();
console.log(newWallet.privateKey);


// write newWallet to a JSON file

// import fs from "fs";

// const walletJSON = newWallet;

// fs.writeFileSync("./wallet.json", JSON.stringify(walletJSON));

