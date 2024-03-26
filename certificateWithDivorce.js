document.addEventListener('DOMContentLoaded', function() {
    // Connect to Ethereum wallet
    async function connectWallet() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.log('Please install MetaMask!');
        }
    }

    connectWallet();

    // Set up Web3
    let web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    }

    // Specify your contract's ABI 
    const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "certificateAddress",
                    "type": "address"
                }
            ],
            "name": "CertificateCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_mari",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_femme",
                    "type": "string"
                }
            ],
            "name": "createCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "certificateAddress",
                    "type": "address"
                }
            ],
            "name": "divorceCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "certificates",
            "outputs": [
                {
                    "internalType": "contract wCertificate",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCertificatesCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "certificateAddress",
                    "type": "address"
                }
            ],
            "name": "getPartnersNames",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contractAddress = '0x42B9cbA424D70a26618dD4917d53a5FB2c7DcB32'; 
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Event listener for creating a certificate
    document.getElementById('createContractBtn').addEventListener('click', async function() {
        const spouse1 = document.getElementById('spouse1').value;
        const spouse2 = document.getElementById('spouse2').value;

        const accounts = await web3.eth.getAccounts();
        contract.methods.createCertificate(spouse1, spouse2).send({ from: accounts[0] })
            .then(function(receipt) {
                document.getElementById('status').textContent = 'Contract created successfully! Address: ' + receipt.events.CertificateCreated.returnValues.certificateAddress;        
            })
            .catch(function(error) {
                document.getElementById('status').textContent = 'Error: ' + error.message;
            });
    });

    // Event listener for checking a certificate
    document.getElementById("btnVerif").addEventListener('click', async function() {
        const contractAddress = document.getElementById('contractAddress').value;


        contract.methods.getPartnersNames(contractAddress).call()
        .then(function(result) {
        const table = document.getElementById('table');
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3= row.insertCell(2)
    
        cell1.innerText = result[0];
        cell2.innerText = result[1];
        cell3.innerText = result[2] ? "Married" : "Divorced";
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    });
    
    

    // Event listener for divorcing a certificate
    document.getElementById("btnDivorce").addEventListener('click', async function() {
        const certificateAddress = document.getElementById('contractAddress').value;
        
        const accounts = await web3.eth.getAccounts();
        contract.methods.divorceCertificate(certificateAddress).send({ from: accounts[0] })
            .then(function(receipt) {
                document.getElementById('status1').textContent = 'Certificate divorced successfully!';
            })
            .catch(function(error) {
                document.getElementById('status1').textContent = 'Error: ' + error.message;
            });

});
});