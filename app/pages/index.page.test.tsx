import 'next';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, screen } from '@lib/testing';
import Endpoints from '@lib/endpoints';
import type { Institution } from '@lib/hooks/useInstitutions';
import InstitutionsPage from './index.page';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('InstitutionsPage', () => {
  it('renders institution list', async () => {
    const institutions: Institution[] = [
      {
        id: '1',
        name: 'Institution 1',
        fullName: 'Institution 1',
        countries: [],
        media: [],
      },
      {
        id: '2',
        name: 'Institution 2',
        fullName: 'Institution 2',
        countries: [],
        media: [],
      },
    ];
    server.resetHandlers(
      rest.get(Endpoints.institutions, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ data: institutions }))
      )
    );

    render(<InstitutionsPage />);

    await screen.findByRole('button', { name: 'Institution 1' });
    await screen.findByRole('button', { name: 'Institution 2' });
  });
});
