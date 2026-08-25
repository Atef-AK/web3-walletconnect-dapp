import React, { useState } from 'react';
import { useWallet } from './useWallet';

export default function App() {
  const { account, chainId, balance, error, connect, disconnect, signMessage } = useWallet();
  const [sig, setSig] = useState('');

  const onSign = async () => {
    const s = await signMessage(`Login ${account} at ${Date.now()}`);
    if (s) setSig(s);
  };

  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 560, margin: '40px auto', color: '#0f172a' }}>
      <h1>Web3 Wallet Connect</h1>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      {!account ? (
        <button className="btn" onClick={connect}>Connect Wallet</button>
      ) : (
        <div>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Chain ID:</strong> {chainId}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={onSign}>Sign message</button>
            <button className="btn" onClick={disconnect}>Disconnect</button>
          </div>
          {sig && <p style={{ wordBreak: 'break-all', color: '#16a34a' }}>Signature: {sig}</p>}
        </div>
      )}
    </main>
  );
}
