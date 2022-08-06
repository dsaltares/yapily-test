import 'next';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, screen } from '@lib/testing';
import Endpoints from '@lib/endpoints';
import type { Account } from '@lib/hooks/useAccounts';
import AccountsPage from './[institutionId].page';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const router = {
  query: {
    institutionId: 'institution-1',
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

describe('AccountsPage', () => {
  it('renders accounts list', async () => {
    const accounts: Account[] = [
      {
        id: '1',
        type: 'account',
        balance: 10,
        currency: 'EUR',
        accountNames: [{ name: 'Ada Lovelace' }],
        accountIdentifications: [{ identification: '12345', type: 'IBAN' }],
      },
      {
        id: '2',
        type: 'account',
        balance: -5,
        currency: 'GBP',
        accountNames: [{ name: 'Nicola Tesla' }],
        accountIdentifications: [{ identification: '67890', type: 'IBAN' }],
      },
    ];
    server.resetHandlers(
      rest.get(Endpoints.consents, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ consents }))
      ),
      rest.get(Endpoints.accounts, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: accounts }))
      )
    );

    render(<AccountsPage />, { router });

    await screen.findByRole('link', { name: '12345 Ada Lovelace €10.00' });
    await screen.findByRole('link', { name: '67890 Nicola Tesla -£5.00' });
  });

  it('renders empty accounts list', async () => {
    server.resetHandlers(
      rest.get(Endpoints.consents, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ consents }))
      ),
      rest.get(Endpoints.accounts, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: [] }))
      )
    );

    render(<AccountsPage />, { router });

    await screen.findByText('🤷 Could not find any accounts');
  });
});
