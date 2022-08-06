import 'next';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, waitFor, screen } from '@lib/testing';
import Endpoints from '@lib/endpoints';
import WithConsent from './WithConsent';

const Dummy = () => <button>Dummy</button>;
const DummyWithConsent = WithConsent(Dummy);
const institutionId = 'institution-1';
const router = {
  query: { institutionId },
  push: jest.fn(),
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('WithConsent', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('redirects to home page if there is no consent', async () => {
    server.resetHandlers(
      rest.get(Endpoints.consents, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ consents: {} }))
      )
    );

    render(<DummyWithConsent />, { router });

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/');
    });
  });

  it('renders the component when there is consent', async () => {
    const consents = {
      'institution-1': {
        consent: 'consent-1',
        institution: 'institution-1',
        applicationUserId: 'application-user-id-1',
        userUuid: 'user-uuid-1',
      },
    };

    server.resetHandlers(
      rest.get(Endpoints.consents, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ consents }))
      )
    );

    render(<DummyWithConsent />, { router });

    await screen.findByRole('button', { name: 'Dummy' });
  });
});
