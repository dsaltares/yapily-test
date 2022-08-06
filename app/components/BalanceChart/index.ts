import dynamic from 'next/dynamic';

const BalanceChart = dynamic(() => import('./BalanceChart'), {
  ssr: false,
});

export default BalanceChart;
