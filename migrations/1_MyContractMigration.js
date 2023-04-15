// SPDX-License-Identifier: MIT
const ElectionSystem = artifacts.require("ElectionSystem");
// const AssertAddress = artifacts.require("AssertAddress");
// const AssertUint = artifacts.require("AssertUint");
// const TestVotingSystem = artifacts.require("TestVotingSystem");


module.exports = function (deployer) {
  deployer.deploy(ElectionSystem);
  //   deployer.deploy(AssertAddress);
  //   deployer.deploy(AssertUint);
  //   deployer.link(AssertAddress, TestVotingSystem);
  // deployer.link(AssertUint, TestVotingSystem);
  // deployer.deploy(TestVotingSystem);



};