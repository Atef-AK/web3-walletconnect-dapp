import { ethers } from 'ethers';
import { useState, useCallback } from 'react';

export function useWallet() {
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connect = useCallback(async () => {
    setError('');
    try {
      if (!window.ethereum) {
        setError('No EVM wallet found. Install MetaMask.');
        return;
      }
      const p = new ethers.BrowserProvider(window.ethereum);
      const accounts = await p.send('eth_requestAccounts', []);
      const net = await p.getNetwork();
      const bal = await p.getBalance(accounts[0]);
      setProvider(p);
      setAccount(accounts[0]);
      setChainId(Number(net.chainId));
      setBalance(ethers.formatEther(bal));
    } catch (e: any) {
      setError(e?.shortMessage || e?.message || 'Connection failed');
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(''); setChainId(null); setBalance(''); setProvider(null);
  }, []);

  const signMessage = useCallback(async (msg: string) => {
    if (!provider || !account) { setError('Connect first'); return; }
    try {
      const signer = await provider.getSigner();
      return await signer.signMessage(msg);
    } catch (e: any) {
      setError(e?.shortMessage || e?.message || 'Sign rejected');
    }
  }, [provider, account]);

  return { account, chainId, balance, error, connect, disconnect, signMessage };
}
