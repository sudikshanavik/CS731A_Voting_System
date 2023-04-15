**Introduction**

This is a voting system for the campus community. We use blockchain technology to improve the election process. This website is decentralized, secure and transparent, making it infeasible to tamper with the results and easy to verify the accuracy of the election. The system makes vote tampering, manipulation, and fraud unfeasible.  It also increases the effectiveness of voting by cutting down on the time and expenses involved with traditional voting procedures and to strengthen the credibility of democracy by giving everyone access to a trustworthy and reliable voting platform. 


**Problems in existing system**

The existing voting system is often plagued by several issues, including voter fraud, manipulation, and inefficiencies.<br>

Major Problems in existing system-<br>

+ Lack of transparency in the voting process and the inability to audit votes result in voter mistrust.<br>
+ The current voting process is prone to fraud and human mistake.<br>
+ The system is vulnerable to outside cyberattacks, which jeopardize the voting process's confidentiality and integrity.<br>
+ The geographical limitations of the voting process may prevent some voters from participating, leading to a skewed representation of the population's opinion.<br>

**Features Implemented**

+ **User-friendly interface:** We designed the client application with a user-friendly interface using React that makes it easy for users to cast their votes and view the voting results.<br>
+ **Transparency:** By the use of blockchain technology, the entire voting process is made transparent by publishing the voting results on the network.<br>
+ **Immutability:** In the blockchain-based voting system, once a vote is casted, it gets recorded on the blockchain i.e. it cannot be altered or deleted. This ensures that the voting process is transparent and trustworthy, as there is a permanent record of each vote that cannot be tampered with.<br>
+ **Easy deployment and testing:** We used Ganache and Truffle, making it easy to deploy and test the voting system locally, reducing the time and resources required for development.<br>
+ **User authentication:** The use of Firebase enabled user authentication, ensuring that only authorized users can access the voting system.<br>
+ **Anonymity:** When a user uses the client application to engage with the voting system, the client application transmits a transaction containing the user's vote to the Ethereum network. In order to confirm their ownership of the Ethereum account from which the transaction was issued, Metamask then asks the user to sign the transaction using their private key. However, neither the network nor anybody else is given access to the private key itself. Instead, Metamask uses the private key to establish a digital signature of the transaction, which is then transmitted to the network. Despite not disclosing the user's name or their private key, the digital signature confirms that the transaction is legitimate and was signed by the owner of the Ethereum account.<br>
+ **Fast transaction speed for voting:** Voting transactions get completed quickly and processed almost instantly by using Ganache and Truffle to build a private blockchain network.<br>
+ **Easily scalable application:** We used Ganache as the private blockchain network and React for the client-side application that made it easy to scale the voting system as needed, enabling accommodating of more voters and increasing capacity as the demand grows.<br>



**Software implementation language/technology**
+ **Blockchain:** For setting up the private blockchain we used Ganache, and Truffle Framework for deploying and interacting with the smart contract that was deployed on Ganache.<br>
+ **Front-End:** For the client application, we used React. The voters can cast their votes and administrators can manage the voting process without any hassle.<br>
+ **Metamask:** It is connected to the blockchain and the front-end. Initially, Ganache creates some accounts with their private keys respectively. Using these private keys, we imported those accounts to metamask.<br>
+ **Back-End:** We used Firebase for storing Contestant details, Manifestos and also for the user authentication.<br>


**Instructions for Deploying**
+ To get the Blockchain running:
+ Install Ganache from https://trufflesuite.com/ganache/
+ Install Truffle:
+ $ sudo npm install -g truffle							
+ Clone the directory 
+ Open Ganache
    + Create a new workspace:
    + Add the truffle-config.js file to your project and start the workspace.
+ Make sure Ganache is running
+ Now move to the directory in which the you cloned the directory and run:
    + truffle console
    + truffle migrate
+ Now your smart contract should be deployed on Ganache. You can see it under the Contracts tab in the Ganache UI

+ To get front end running:
+ First node.js must be installed. 
+ Go to the following link https://nodejs.org/en/download
+ Go to terminal and type in command node -v to verify whether node.js is installed or not.
+ Install npm in your computer by entering the command ‘npm install’ in your terminal.
+ Install all the below dependencies:
    + npm install @emotion/react@^11.10.6 @emotion/styled@^11.10.6 @fortawesome/fontawesome-svg-core@^6.4.0 @fortawesome/free-regular-svg-icons@^6.4.0 @fortawesome/free-solid-svg-icons@^6.4.0 @fortawesome/react-fontawesome@^0.2.0 @mui/icons-material@^5.11.16 @mui/material@^5.11.16 @testing-library/jest-dom@^5.16.5 @testing-library/react@^13.4.0 @testing-library/user-event@^13.5.0 assert@^2.0.0 bootstrap-icons@^1.10.3 buffer@^6.0.3 ethers@^6.3.0 firebase@^9.19.1 history@^5.3.0 react@^18.2.0 react-dom@^18.2.0 react-ionicons@^4.2.0 react-loader-spinner@^5.3.4 react-router-dom@^6.10.0 react-scripts@5.0.1 stream@^0.0.2 web-vitals@^2.1.4 web3@^1.9.0 web3-utils@^1.9.0

+ Clone the files from Github
+ Now move the ‘build’ folder (containing compiled smart contract in JSON format) to the src folder in your VS code.
+ Move to the directory: src -> context -> index.jsx
    + Change the contract address in the index.jsx file to your contract address
+ Go to the terminal in VS code (make sure the current directory is the github root folder) and then enter ‘npm start’. This will start the front end and redirect you to your default browser.



**Developers**
+ Sudiksha Navik: sudiksha22@iitk.ac.in
+ Drashtant Singh Rathod: drashtants22@iitk.ac.in
+ Shashank Rapolu: ssrapolu20@iitk.ac.in




