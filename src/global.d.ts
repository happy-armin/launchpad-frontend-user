// src/global.d.ts
interface Window {
  ethereum?: {
    isMetaMask: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    // Add other properties and methods you might need here
  };
}
