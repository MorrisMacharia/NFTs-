require("dotenv").config();
const { ethers } = require("ethers");

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider("sepolia", process.env.API_KEY);
// const provider = new ethers.AlchemyProvider("sepolia", process.env.API_URL);


const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
// Create a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = "0x3202f805D77a911703B3881C072dfDe9927b4734";

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);

// Get the NFT Metadata IPFS URL
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmcbbZuSxCYEZzLdJtaFMbvvwYmjFm5EFjs1Khf8iYF7Cb";

// Call mintNFT function
const mintNFT = async () => {
  let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri);
  await nftTxn.wait();
  console.log(
    `NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
  );
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
