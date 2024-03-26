// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract wCertificate {
    string public mari;
    string public femme;
    bool public isDivorced;
    address public owner;

    constructor(string memory _mari, string memory _femme) {
        mari = _mari;
        femme = _femme;
        isDivorced = false;
        owner = msg.sender;
    }

    function getPartners() public view returns (string memory, string memory,bool) {
        return (mari, femme,isDivorced);
    }

    function divorce() public {
        require(!isDivorced, "Certificate already divorced");
        require(msg.sender == owner, "Only the certificate owner can initiate divorce");
        
        isDivorced = true;
    }
}