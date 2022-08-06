import { useMemo } from 'react';
import { type AxisOptions, Chart } from 'react-charts';
import { useRouter } from 'next/router';
import type { Balance } from '@lib/hooks/useBalances';
import useMonthFromRoute from '@lib/hooks/useMonthFromRoute';
import useBalances from '@lib/hooks/useBalances';
import Spinner from './Spinner';

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

  const data = useMemo(
    () => [
      {
        label: 'Balances',
        data: balances || [],
      },
    ],
    [balances]
  );

  const primaryAxis = useMemo(
    (): AxisOptions<Balance> => ({
      getValue: (datum) => datum.date,
      show: false,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Balance>[] => [
      {
        getValue: (datum) => datum.amount,
        elementType: 'area',
      },
    ],
    []
  );

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (balances && balances.length) {
    content = (
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    );
  }

  return <div className="flex justify-center w-full h-[400px]">{content}</div>;
};

export default BalanceChart;
