// xGorilla
async function main() {
  // const xTransformersToken = await ethers.getContractFactory("xTransformersToken");
  // console.log("Deploying xTransformersToken...");
  // const _xTransformersToken = await xTransformersToken.deploy("XTR","XTR");
  // console.log("xTransformersToken deployed to:", _xTransformersToken.address);

  const Popular = await ethers.getContractFactory("Popular");
  console.log("Deploying Popular...");
  // const _TransformersNFT = await TransformersNFT.deploy("TransformersNFT","TransformersNFT",_xTransformersToken.address,"https://gateway.pinata.cloud/ipfs/QmdrNnEZEztJXtCK9QfYxZvK8WsV88Khm3w4kgkvSFNMAG/");
  const _Popular = await Popular.deploy();
  console.log("Popular deployed to:", _Popular.address);

}

// 这里也可以简化为 main()，后面的都省略也可以
main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });