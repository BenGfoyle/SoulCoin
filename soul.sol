pragma solidity >= 0.4.22 < 0.6.0;

//declare contract and coin attributes
contract Soulcoin{
    address owner;
    string name;
    string symbol;
    uint totalSouls;

//----------------------------------------------------------------------------//

    //mapping addreses to balance
    mapping(address => uint256) public balance;

//----------------------------------------------------------------------------//

    //constructor for initialising coin
    constructor(string memory _name, string memory _symbol, uint256 _totalSouls) public{
      owner = msg.sender;
      name = _name;
      symbol = _symbol;
      totalSouls = _totalSouls;

      //give owner all coins initially
      balance[owner] = totalSouls;
    }

    //event applications can listen to ie: when coin is transfered
    event Transfer(address indexed _from, address indexed _to, uint _value);

//----------------------------------------------------------------------------//


    //get total supply of souls
    function getTotalSupply() vuew public returns (uint256){
        return totalSouls;
    }

//----------------------------------------------------------------------------//


    //get balance of a given user
    function balanceOf(address _owner) view public returns(uint256){
        return balance[_owner];
    }

//----------------------------------------------------------------------------//

    //transfer funds from one account to another, returns true if succesful
    function transfer(address _to, uint256 _value) public returns(bool){
        //check user has balance to make transfer
        require (balance[msg.sender] > _value);

        //update balance
        address _from = msg.sender;
        owner = _to;
        emit Transfer(_from, _to, _value);
        balance[_from] = balance[_from] - _value;
        alance[_to] = balance[_to] + _value;
        return true;
    }
}
