import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import FitnessTrackerContract from './FitnessTracker.json';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [runningDistance, setRunningDistance] = useState('');
  const [fitnessHistory, setFitnessHistory] = useState([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');

  const contractAddress = '0xbfFfc68E0F30901d3E8e6d194b65cCA205D15499'; // Replace with your actual contract address
  const fitnessTrackerABI = FitnessTrackerContract.abi;

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FitnessTrackerContract.networks[networkId];
        const contract = new web3.eth.Contract(
          fitnessTrackerABI,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contract);
      }
    };

    initContract();
  }, [web3]);

  useEffect(() => {
    const loadAccounts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }
    };

    loadAccounts();
  }, [web3]);

  useEffect(() => {
    const loadFitnessHistory = async () => {
      if (contract && accounts.length > 0) {
        const history = await contract.methods.getFitnessHistory().call({ from: accounts[0] });
        setFitnessHistory(history);
      }
    };
  
    const listenForEvents = async () => {
      if (contract && accounts.length > 0) {
        // Check if the contract has the 'events' property before trying to listen for events
        if (contract.events && contract.events.FitnessRecorded) {
          contract.events.FitnessRecorded({ filter: { user: accounts[0] } })
            .on('data', (event) => {
              // Fetch the updated fitness history when a new FitnessRecorded event is emitted
              loadFitnessHistory();
            })
            .on('error', (error) => {
              console.error('Event error:', error);
            });
        }
      }
    };
  
    loadFitnessHistory(); // Load fitness history when the component mounts
    listenForEvents(); // Set up event listener for FitnessRecorded
  
  }, [contract, accounts]);
  

  useEffect(() => {
    const listenForEvents = async () => {
      if (contract && accounts.length > 0) {
        contract.once('BMICalculated', { filter: { user: accounts[0] } }, (error, event) => {
          if (error) {
            console.error('Event error:', error);
          } else {
            const { bmi, status } = event.returnValues;
            setBmiResult(bmi);
            setBmiStatus(status); // Store the status in the state (renamed to bmiStatus)
          }
        });
      }
    };

    listenForEvents();
  }, [contract, accounts]);

   const [bmiStatus, setBmiStatus] = useState('');

  const handleCalculateBMI = async () => {
    if (contract && weight !== '' && height !== '') {
      await contract.methods.calculateBMI(parseInt(weight), parseInt(height)).send({ from: accounts[0] });
    }
  };
  


  const handleGetTotalDistance = async () => {
    if (contract && accounts.length > 0) {
      try {
        const totalDistance = await contract.methods.getTotalDistance().call({ from: accounts[0] });
        alert(`Total Distance: ${totalDistance} meters`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleRecordFitness = async () => {
    if (contract && runningDistance !== '' && accounts.length > 0) {
      await contract.methods.recordFitness(parseInt(runningDistance)).send({ from: accounts[0] });
      setRunningDistance('');
    }
  };

  const handleClearHistory = async () => {
  if (contract && accounts.length > 0) {
    await contract.methods.clearFitnessHistory().send({ from: accounts[0] });
    // Refresh the page after history is cleared
    window.location.reload();
  }
};

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toUTCString(); // Convert date to a human-readable string
  };

  return (
    <div className="App">
      <h1>Fitness Tracker dApp</h1>
      <div>
        <h2>Record Fitness Data</h2>
        <label>Running Distance (in meters):</label>
        <input
          type="number"
          value={runningDistance}
          onChange={(e) => setRunningDistance(e.target.value)}
        />
        <button onClick={handleRecordFitness}>Record Fitness</button>
      </div>
      <div>
        <h2>Fitness History</h2>
        <ul>
          {fitnessHistory.map((record, index) => (
            <li key={index}>
              Day {record.day}: {record.distance} meters - {formatDate(record.timestamp)}
            </li>
          ))}
        </ul>
        <button onClick={handleClearHistory}>Clear History</button>
        <button onClick={handleGetTotalDistance}>Get Total Distance</button>
      </div>
      <div>
        <h2>BMI Calculator</h2>
        <label>Weight (in kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <label>Height (in cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button onClick={handleCalculateBMI}>Calculate BMI</button>
        {bmiResult !== '' && (
          <div>
            <p>Your BMI: {bmiResult/10}</p>
            <p>Status: {bmiStatus}</p> {/* Display the bmiStatus */}
          </div>
        )}
      </div>
    </div>
  );

 
}

export default App;




