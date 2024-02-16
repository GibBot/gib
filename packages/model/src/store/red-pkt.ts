import { createGlobalStore } from 'hox';
import { useEffect, useState } from 'react';
import { useBalance } from './balance';

export const [useSendPkt, getSendPkt] = createGlobalStore(() => {
  const { tokens } = useBalance();
  const [selectedTokenAddr, setSelectedToken] = useState<
    string | undefined
  >();
  const [participant, setParticipant] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const selectedToken = tokens.find(
    token => token.address === selectedTokenAddr,
  );

  const send = () => {};

  useEffect(() => {
    if (tokens.length > 0 && !selectedTokenAddr) {
      setSelectedToken(tokens[0].address);
    }
  }, [tokens]);

  return {
    selectedToken,
    setSelectedToken,
    participant,
    setParticipant,
    totalAmount,
    setTotalAmount,
    send,
  };
});
