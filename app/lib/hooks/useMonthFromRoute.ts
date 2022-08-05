import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isThisMonth from 'date-fns/isThisMonth';
import { useRouter } from 'next/router';

const useMonthFromRoute = () => {
  const router = useRouter();
  const beforeQuery = router.query.before as string;
  const fromQuery = router.query.from as string;

  const from = fromQuery ? new Date(fromQuery) : startOfMonth(new Date());
  const before = beforeQuery ? new Date(beforeQuery) : undefined;

  const next = () => {
    const newFrom = addMonths(from, 1);
    const newBefore = isThisMonth(newFrom) ? undefined : endOfMonth(newFrom);
    return router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        from: newFrom.toISOString(),
        before: newBefore?.toISOString(),
      },
    });
  };

  const previous = () => {
    const newFrom = subMonths(from, 1);
    const newBefore = endOfMonth(newFrom);
    return router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        from: newFrom.toISOString(),
        before: newBefore.toISOString(),
      },
    });
  };

  return { from, before, next, previous };
};

export default useMonthFromRoute;
