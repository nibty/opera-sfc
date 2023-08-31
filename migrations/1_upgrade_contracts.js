const Updater = artifacts.require('Updater');
const SFC = artifacts.require('SFC');
const SFCLib = artifacts.require('SFCLib');
const ConstantsManager = artifacts.require('ConstantsManager');
const NodeDriverAuth = artifacts.require('NodeDriverAuth');
//
// const NodeDriverAuth = artifacts.require('NodeDriverAuth');
// constructor(address _sfcFrom, address _sfcLib, address _sfcConsts, address _govTo, address _govFrom, address _voteBook, address _owner) public {

module.exports = async function (deployer, network, accounts) {
    // const govTo = '0x0';
    // const govFrom = '0x0';
    // const voteBook = '0x0';
    const nd = await NodeDriverAuth.at('0xd100ae0000000000000000000000000000000000');
    await deployer.deploy(ConstantsManager);
    await deployer.deploy(SFCLib);

    const oldSfc = await SFC.at('0xFC00FACE00000000000000000000000000000000');
    await deployer.deploy(SFC);
    const updater = await deployer.deploy(Updater, SFC.address, SFCLib.address, ConstantsManager.address, accounts[0]);

    // make the update owner of the contracts
    // the execute function will transfer the ownership back to the owner
    // is there a better/safer way? If this fails, we are fucked
    console.log('transfer ownership to updater');
    await nd.transferOwnership(Updater.address);
    await oldSfc.transferOwnership(Updater.address);

    console.log('execute update');
    await updater.execute();
};
