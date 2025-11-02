// js/data.js

// Базовые курсы (к USD)
const exchangeRates = {
  BTC: 34567.89,
  ETH: 1823.45,
  USDT: 1.00,
  USD: 1.00,
  EUR: 0.92
};

// История транзакций (моковые данные)
const transactionHistory = [
  {
    id: 'TX001234',
    date: '2025-11-02 10:15',
    from: 'BTC',
    to: 'USD',
    amountFrom: 0.5,
    amountTo: 17283.95,
    status: 'completed'
  },
  {
    id: 'TX001233',
    date: '2025-11-02 09:42',
    from: 'ETH',
    to: 'EUR',
    amountFrom: 2.0,
    amountTo: 3355.17,
    status: 'completed'
  },
  {
    id: 'TX001232',
    date: '2025-11-01 18:30',
    from: 'USDT',
    to: 'BTC',
    amountFrom: 5000,
    amountTo: 0.1447,
    status: 'completed'
  },
  {
    id: 'TX001231',
    date: '2025-11-01 14:22',
    from: 'USD',
    to: 'ETH',
    amountFrom: 1000,
    amountTo: 0.5483,
    status: 'pending'
  }
];

// Информация о валютах
const currencies = {
  BTC: { name: 'Bitcoin', symbol: '₿', type: 'crypto' },
  ETH: { name: 'Ethereum', symbol: 'Ξ', type: 'crypto' },
  USDT: { name: 'Tether', symbol: '₮', type: 'crypto' },
  USD: { name: 'US Dollar', symbol: '$', type: 'fiat' },
  EUR: { name: 'Euro', symbol: '€', type: 'fiat' }
};
