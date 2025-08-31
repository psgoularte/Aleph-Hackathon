import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedDataChain = await deploy("DataChain", {
    from: deployer,
    log: true,
  });

  console.log(`DataChain contract: `, deployedDataChain.address);
};
export default func;
func.id = "deploy_DataChain"; // id required to prevent reexecution
func.tags = ["DataChain"];
