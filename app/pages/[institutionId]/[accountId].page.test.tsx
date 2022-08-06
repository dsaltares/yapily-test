import 'next';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, screen } from '@lib/testing';
import Endpoints from '@lib/endpoints';
import type { Account } from '@lib/hooks/useAccounts';
import { type Transaction } from '@lib/hooks/useTransactions';
import AccountPage from './[accountId].page';

jest.mock(
  '@components/BalanceChart',
  () =>
    function BalanceChart() {
      return <span>BalanceChart</span>;
    }
);

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const router = {
  query: {
    institutionId: 'institution-1',
    accountId: 'account-1',
  },
};

const consents = {
  'institution-1': {
    consent: 'consent-1',
    institution: 'institution-1',
    applicationUserId: 'application-user-id-1',
    userUuid: 'user-uuid-1',
  },
};

const account: Account = {
  id: 'account-1',
  type: 'account',
  balance: 10,
  currency: 'EUR',
  accountNames: [{ name: 'Ada Lovelace' }],
  accountIdentifications: [{ identification: '12345', type: 'IBAN' }],
};

describe('AccountPage', () => {
  it('renders transactions list', async () => {
    const date1 = new Date('2022-08-06');
    const date2 = new Date('2022-08-05');
    const date3 = new Date('2022-08-04');
    const transactions: Transaction[] = [
      {
        id: 'transaction-1',
        date: date1.toISOString(),
        status: 'BOOKED',
        amount: 100,
        currency: 'EUR',
        description: 'Transaction 1',
        balance: {
          type: 'EXPECTED',
          balanceAmount: {
            amount: 10,
            currency: 'EUR',
          },
        },
      },
      {
        id: 'transaction-2',
        date: date2.toISOString(),
        status: 'BOOKED',
        amount: -5,
        currency: 'EUR',
        description: 'Transaction 2',
        balance: {
          type: 'EXPECTED',
          balanceAmount: {
            amount: -90,
            currency: 'EUR',
          },
        },
      },
      {
        id: 'transaction-3',
        date: date3.toISOString(),
        status: 'BOOKED',
        amount: 10,
        currency: 'EUR',
        description: 'Transaction 3',
        balance: {
          type: 'EXPECTED',
          balanceAmount: {
            amount: -85,
            currency: 'EUR',
          },
        },
      },
    ];
    server.resetHandlers(
      rest.get(Endpoints.consents, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ consents }))
      ),
      rest.get(Endpoints.accounts, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: [account] }))
      ),
      rest.get(Endpoints.transactions(account.id), (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: transactions }))
      )
    );

    render(<AccountPage />, { router });

    await screen.findByRole('cell', { name: 'Transaction 1' });
    await screen.findByRole('cell', { name: 'Transaction 2' });
    await screen.findByRole('cell', { name: 'Transaction 3' });
  });

  it('renders empty state', async () => {
    server.resetHandlers(
      rest.get(Endpoints.consents, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ consents }))
      ),
      rest.get(Endpoints.accounts, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: [account] }))
      ),
      rest.get(Endpoints.transactions(account.id), (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: [] }))
      )
    );

    render(<AccountPage />, { router });

    await screen.findByText('No transactions found');
  });
});
