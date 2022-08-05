import format from 'date-fns/format';
import isThisMonth from 'date-fns/isThisMonth';
import classNames from 'classnames';
import useMonthFromRoute from '@lib/hooks/useMonthFromRoute';

const MonthPicker = () => {
  const { from, next, previous } = useMonthFromRoute();
  const buttonClass =
    'rounded border border-slate-200 hover:slate-100 w-10 h-10';

  return (
    <div className="flex flex-row items-center gap-5">
      <button className={buttonClass} onClick={previous}>
        👈
      </button>
      <div className="text-primary">{format(from, 'MMM yyyy')}</div>
      <button
        className={classNames(buttonClass, {
          'bg-slate-200': isThisMonth(from),
        })}
        disabled={isThisMonth(from)}
        onClick={next}
      >
        👉
      </button>
    </div>
  );
};

export default MonthPicker;
