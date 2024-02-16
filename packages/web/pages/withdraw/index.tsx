import Edit from '@/components/Deposit/EditAddress';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Withdraw() {
  const router = useRouter();
  return (
    <Edit
      onSave={() => {
        toast.success('Withdraw submitted');
        router.back();
      }}
    />
  );
}
