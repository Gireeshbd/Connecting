import { ethers } from "./ethers-5.6.esm.min.js";
import { UsdtAddress, ERC20_ABI, contractAddress, abi } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    document.getElementById("connectButton").innerHTML = "Connected";
    console.log("Wallet connected");
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask";
  }
}
// async function fund() {
//   const usdtAmount = 100;
//   if (typeof window.ethereum !== "undefined") {

//     const ChainId = await ethereum.request({ method: "eth_chainId" });
//     if (ChainId !== 0x38) {
//       alert("Please connect to mainnet");
//     }
//     //signer
//     //contract address, abi
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     console.log(signer);
//     const UsdtContract = new ethers.Contract(UsdtAddress, ERC20_ABI, signer);
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     // await Usdtcontract.approve(UsdtAddress, usdtAmount);
//     // console.log("approved");
//     // const transcationResponse = await contract.buy(usdtAmount);
//     // console.log(transcationResponse);
//     UsdtContract.methods
//       .approve(contractAddress, usdtAmount)
//       .on("transcationHash", (hash) => {
//         contract.methods.buy(usdtAmount).send({ from: signer });
//       });
//   }
// }

async function fund() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const UsdtContract = new ethers.Contract(UsdtAddress, ERC20_ABI, signer);
    let request = await UsdtAddress.methods
      .approve(contractAddress, UsdtAmount)
      .send({ from: accounts[0] });
    const contract = new ethers.Contract(contractAddress, abi, signer);
    request = await contract.methods
      .buy(UsdtAmount)
      .send({ from: accounts[0] });
    alert("Successfuly completed transcation");
    console.log(request);
  } catch (err) {
    alert("Error Buying Tokens");
  }
}
