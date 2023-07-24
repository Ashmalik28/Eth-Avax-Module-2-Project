// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FitnessTracker {
    address public owner;

    struct FitnessRecord {
        uint256 day;
        uint256 distance;
        uint256 timestamp;
    }

    mapping(address => FitnessRecord[]) private runningDistances;

    event FitnessRecorded(address indexed user, uint256 day, uint256 distance, uint256 timestamp);
    event FitnessRecordUpdated(address indexed user, uint256 index, uint256 newDistance);
    event BMICalculated(address indexed user, uint256 bmi, string status);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function recordFitness(uint256 distance) public {
        uint256 day = runningDistances[msg.sender].length + 1; // Increment day number by 1 for each new record
        uint256 timestamp = block.timestamp; // Get the current block timestamp
        FitnessRecord memory record = FitnessRecord(day, distance, timestamp);
        runningDistances[msg.sender].push(record);
        emit FitnessRecorded(msg.sender, day, distance, timestamp);
    }

    function getFitnessHistory() public view returns (FitnessRecord[] memory) {
        return runningDistances[msg.sender];
    }

    function getFitnessRecord(uint256 index) public view returns (FitnessRecord memory) {
        require(index < runningDistances[msg.sender].length, "Invalid index");
        return runningDistances[msg.sender][index];
    }

    function getFitnessHistoryLength() public view returns (uint256) {
        return runningDistances[msg.sender].length;
    }

    function calculateBMI(uint256 weight, uint256 height) public {
        require(weight > 0 && height > 0, "Weight and height must be greater than zero");
        uint256 bmi = (weight * 10000 * 10) / (height * height); // BMI formula: weight(kg) / height(m)^2

        string memory status;

        if (bmi < 185) {
            status = "Underweight";
        } else if (bmi >= 185 && bmi < 249) {
            status = "Normal weight";
        } else if (bmi >= 250 && bmi < 299) {
            status = "Overweight";
        } else {
            status = "Obese";
        }

        emit BMICalculated(msg.sender, bmi, status);
    }

    function getTotalDistance() public view returns (uint256) {
        uint256 totalDistance = 0;
        FitnessRecord[] memory records = runningDistances[msg.sender];
        for (uint256 i = 0; i < records.length; i++) {
            totalDistance += records[i].distance;
        }
        return totalDistance;
    }

    function clearFitnessHistory() public {
        delete runningDistances[msg.sender];
    }
}

