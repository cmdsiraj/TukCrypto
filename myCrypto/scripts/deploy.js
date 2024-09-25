async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const TukCoin = await ethers.getContractFactory("TukCoin");
  const tukCoin = await TukCoin.deploy();

  console.log("TukCoin deployed to:", tukCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
