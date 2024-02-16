import { useState } from 'react';
import { TokenList } from './BalanceList';
import { TxList } from './TxList';

export const AccountDetail: React.FC<{
  className?: string;
}> = ({ className }) => {
  const tabs = ['My Tokens', 'Transactions'];
  const [selectedTab, setSelectedTab] = useState('My Tokens');

  function isSelected(tab: string) {
    if (tab === selectedTab) {
      return 'text-primary';
    }

    return 'text-muted';
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-[16px] flex flex-row">
        {tabs.map((value, index) => {
          return (
            <div
              className={`font-rubik text-[17px] font-medium leading-[16px] ml-[16px] ${isSelected(
                value,
              )}`}
              key={index}
              onClick={() => setSelectedTab(value)}
            >
              {value}
            </div>
          );
        })}
      </div>
      {selectedTab === 'My Tokens' && <TokenList />}
      {selectedTab === 'Transactions' && <TxList />}
    </div>
  );
};
