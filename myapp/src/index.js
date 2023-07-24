import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import FitnessTrackerContract from './FitnessTracker.json';
import HomePage from './App';
import './index.css';

const contractAddress = '0xbfFfc68E0F30901d3E8e6d194b65cCA205D15499'; // The deployed contract address on the Goerli test network
const contractABI = FitnessTrackerContract.abi;

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        resolve(web3);
      }
    });
  });

const getContractInstance = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = FitnessTrackerContract.networks[networkId];
  return new web3.eth.Contract(contractABI, deployedNetwork && deployedNetwork.address);
};

async function init() {
  try {
    const web3 = await getWeb3();
    const contract = await getContractInstance(web3);

    ReactDOM.render(
      <React.StrictMode>
        <HomePage web3={web3} contract={contract} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch (error) {
    console.error('Error loading web3 or contract:', error);
  }
}

init();






