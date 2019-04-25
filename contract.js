// called if user does not have an Ethereum wallet available
function warning(){
  alert("You do not have MetaMask installed some features are unavailable!")
}

//----------------------------------------------------------------------------//

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(web3.currentProvider);
} else {
  warning();
}

//get all accounts
web3.eth.getAccounts(function(err, accounts){
    //check if null
    if (err != null){
      console.error("An error occurred: "+err);
      alert("An error has occured");
    }
    //check if length is 0 => not logged in
    else if (accounts.length == 0){
      console.log("User is not logged in to MetaMask");
      alert("Please log into MetaMask, and refresh the page");
    }
    //return true if account exists
    else console.log("User is logged in to MetaMask");
});

//----------------------------------------------------------------------------//

var gasPrice = -1;
//get gas current gas price
function thatsGas(){
  web3.eth.getGasPrice(function(error,result){
     gasPrice = ((result['c'][0])/1000000000);
    console.log(gasPrice);
    document.getElementById("gasNotif").innerHTML += (gasPrice + " Gwei");
  });
}

//----------------------------------------------------------------------------//

//insert contract abi, allow website access to contrat elements
let abi = []

//initialising contract
contract = web3.eth.contract(abi);
var instance;
var net = -1;
web3.version.getNetwork((err, netId) => {
  net = netId;
  switch (netId) {
    case "1":
      document.getElementById("tests").innerHTML = "You are using the main Ethereum network.<br>";
      // Put the main Ethereum network contract address here
      var contractAddr;
      instance = contract.at(contractAddr);
      break
    case "2":
      document.getElementById("tests").innerHTML ='You are using the Ropsten test network.<br>';
      //ropsten version of contract
      var contractAddr = "0xAe928DFa7A4D2303b7dA2a110951216F7e6738bF";
      instance = contract.at("contractAddr");
      break
    default: //any network other than Ropsten and Live Network.
      document.getElementById("tests").innerHTML ='You are using an unsupported network.<br>';
  }
})

thatsGas();
