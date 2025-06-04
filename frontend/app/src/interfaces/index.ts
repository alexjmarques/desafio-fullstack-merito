export interface Fund {
    id?: number;
    name?: string;
    ticker?: string;
    fund_type?: string;
    share_value?: number;
    share_qty?: number | undefined | null;
    date?: string;
}

export interface FundFormProps {
    onClose: () => void;
    onSaved: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    fund?: Fund | null;
}

export interface WalletSummary {
    total_contributions: number;
    total_balance: number;
    total_redemptions: number;
    funds: Fund[];
}

export interface FundLite {
    id: number;
    ticker: string;
    name: string;
}

export interface Transaction {
    id: number;
    date: string;
    tx_type: 'APORTE' | 'RESGATE';

    share_qty: number;
    amount: number;
    fund: FundLite;
    fund_id: number;
}


export interface TransactionFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSaved: () => void;
  transactionsItem?: Transaction | null;
}