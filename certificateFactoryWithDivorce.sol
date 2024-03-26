// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./certificateWithDivorce.sol";

contract wCertificateFactory {
    wCertificate[] public certificates;

    event CertificateCreated(address certificateAddress);

    function createCertificate(string calldata _mari, string calldata _femme) external {
        wCertificate newCertificate = new wCertificate(_mari, _femme);
        certificates.push(newCertificate);
        emit CertificateCreated(address(newCertificate));
    }

    function getCertificatesCount() external view returns (uint) {
        return certificates.length;
    }

    function getPartnersNames(address certificateAddress) external view returns (string memory, string memory,bool) {
        wCertificate certificate = wCertificate(certificateAddress);
        return certificate.getPartners();
    }
    
    function divorceCertificate(address certificateAddress) external {
        wCertificate certificate = wCertificate(certificateAddress);
        certificate.divorce();
    }
}