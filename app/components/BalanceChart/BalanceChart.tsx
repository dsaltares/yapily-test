import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useRouter } from 'next/router';
import useMonthFromRoute from '@lib/hooks/useMonthFromRoute';
import useBalances from '@lib/hooks/useBalances';
import Spinner from '@components/Spinner';

const BalanceChart = () => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const { from, before } = useMonthFromRoute();
  const { data: balances, isLoading } = useBalances({
    institutionId,
    accountId,
    from: from?.toISOString(),
    before: before?.toISOString(),
  });

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (balances && balances.length) {
    content = (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={balances}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return <div className="flex justify-center w-full h-[400px]">{content}</div>;
};

export default BalanceChart;
