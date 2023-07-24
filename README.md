# Fitness Tracker Smart Contract

>  A Simple Web3 application for connecting to your Metamask and interecting with the front end of our contract 

## Description 

The FitnessTracker is a smart contract written in Solidity that allows users to record and track their fitness activities. It provides functions to record running distances, calculate BMI (Body Mass Index), retrieve fitness history, and get total distance covered.

---
## Contract Details

1) Network: Ethereum Goerli
2) Contract Address: [0xbfFfc68E0F30901d3E8e6d194b65cCA205D15499]
3) Solidity Version: 0.8.9
4) License: UNLICENSED (SPDX-License-Identifier)

## Technologies Used 

This project used the following technologies:

- **Solidity**: Solidity is a programming language specifically designed for writing smart contracts on the Ethereum platform. It is used to write the "Myproject" smart contract in this project. 

- **Web3.js**: Web3.js is a JavaScript library that allows developers to interact with Ethereum and other blockchain networks by providing an easy-to-use interface to interact with smart contracts, manage accounts, and send transactions. It is an essential tool for building decentralized applications (DApps) and integrating blockchain functionality into web applications.

- **MetaMask**: MetaMask is a popular browser extension wallet that allows users to manage Ethereum accounts and interact with decentralized applications. It is used to connect to the Ethereum Goerli network and perform transactions in this project. 

- **Truffle**: Truffle is a development framework for Ethereum smart contracts that simplifies the process of building, testing, and deploying decentralized applications (DApps). It provides a suite of tools and utilities that streamline the development workflow, enabling developers to focus on writing smart contracts and frontend code without worrying about complex configurations.

## Installation ⬇️

### Follow these steps to run this project locally on your system

1. Download or clone the repository by git command.
2. Install the dependencies by running `npm install`.
3. Install truffle by running 'npm install -g truffle' .
4. Then run this command 'truffle migrate --network goerli' to deploy our contract on goerli eth.
5.Then with the help of cd go to my-app directory.
6. Start the development server by running `npm run dev`.

### Configure MetaMask to use ETH Goerli network  🦊

1. Connect your MetaMask Wallet to the ChainList website.
2. Select the 'Include Testnets' checkbox.
3. Search for "Goerli" in the 'Search Networks' tab.
4. Find the Goerli network you want to connect to and click 'Add to MetaMask'. It will be automatically added to your wallet.

## Functions

**recordFitness(uint256 distance):** Allows users to record a fitness activity by providing the distance covered. It stores the activity details in the runningDistances mapping.

**getFitnessHistory():** Retrieves the fitness activity history for the caller (the user who calls this function).

**calculateBMI(uint256 weight, uint256 height):** Calculates the BMI of the caller based on their weight and height. It emits the BMICalculated event with the calculated BMI and a status indicating the BMI category.

**getTotalDistance():** Returns the total distance covered by the caller (sum of all recorded distances).

**clearFitnessHistory():** Allows the user to clear their fitness activity history.

## Conclusion

The FitnessTracker smart contract offers a decentralized and transparent solution for individuals seeking to track and manage their fitness activities on the Ethereum blockchain. By leveraging the power of blockchain technology, users can securely record their running distances and retrieve their fitness history at any time. Additionally, the BMI calculation feature provides valuable health insights to users, allowing them to monitor their fitness progress more effectively.

