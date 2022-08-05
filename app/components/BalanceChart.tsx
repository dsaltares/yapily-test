import { useMemo } from 'react';
import { type AxisOptions, Chart } from 'react-charts';
import { useRouter } from 'next/router';
import type { Balance } from '@lib/hooks/useBalances';
import useMonthFromRoute from '@lib/hooks/useMonthFromRoute';
import useBalances from '@lib/hooks/useBalances';

const BalanceChart = () => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const { from, before } = useMonthFromRoute();
  const { data: balances } = useBalances({
    institutionId,
    accountId,
    from: from?.toISOString(),
    before: before?.toISOString(),
  });

  const data = [
    {
      label: 'Balances',
      data: balances || [],
    },
  ];

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

  return (
    <div className="w-full h-[400px]">
      {balances && balances.length > 1 && (
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      )}
    </div>
  );
};

export default BalanceChart;
