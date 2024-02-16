import { useBalance } from '@bot/model';
import { useState } from 'react';
import EditAddress from './EditAddress';
import { DepositQrcode } from './Qrcode';

export function Deposit() {
  const { bindAddress } = useBalance();
  const [editMode, setEditMode] = useState(false);

  if (!bindAddress || editMode) {
    return (
      <EditAddress
        onSave={() => {
          if (editMode) {
            setEditMode(false);
          }
        }}
      />
    );
  }

  return <DepositQrcode onEdit={() => setEditMode(true)} />;
}
