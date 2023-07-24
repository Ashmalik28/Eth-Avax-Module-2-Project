const Assessment = artifacts.require("FitnessTracker");

module.exports = function(deployer) {
  deployer.deploy(Assessment).then(async () => {
    const deployedContract = await Assessment.deployed();
    console.log("Contract deployed at:", deployedContract.address);
  });
};











 




