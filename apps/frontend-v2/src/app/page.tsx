'use client';
import { Button } from '@/components/ui/button';
import {
  useAccount,
  useAccounts,
  useConnectUI,
  useDisconnect,
  useFuel,
  useIsConnected,
  useWallet,
} from '@fuels/react';
import { bn } from 'fuels';
import { toast } from 'react-toastify';

export default function Home() {
  const notify = () => toast('Wow so easy !');

  const { connect, error, isError, theme, isConnecting } = useConnectUI();
  const { fuel } = useFuel();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const { account } = useAccount();
  const { accounts } = useAccounts();

  return (
    <div className="flex justify-between">
      <Button onClick={notify}>Toast</Button>
      <div className="Actions">
        {!isConnected && (
          <Button
            variant="default"
            onClick={() => {
              console.log('connect');
              connect();
            }}
          >
            {isConnecting ? 'Connecting' : 'Connect'}
          </Button>
        )}
        {isConnected && (
          <Button variant="ghost" onClick={() => disconnect()}>
            {account}
          </Button>
        )}
      </div>
    </div>
  );
}