export const VaultTimelockABI = [
  { "inputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "isOperationReady", "outputs": [{ "internalType": "bool", "name": "ready", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getMinDelay", "outputs": [{ "internalType": "uint256", "name": "duration", "type": "uint256" }], "stateMutability": "view", "type": "function" }
] as const;
