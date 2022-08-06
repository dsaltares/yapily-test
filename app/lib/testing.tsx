/* eslint-disable import/export */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { type PropsWithChildren, useState, type ReactElement } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import type { NextRouter } from 'next/router';

export const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: () => Promise.resolve(),
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
};

function createAllTheProviders(options?: RenderOptions) {
  function AllTheProviders({ children }: PropsWithChildren) {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              cacheTime: Infinity,
              retry: false,
            },
            mutations: {
              retry: false,
            },
          },
        })
    );

    const [nextRouter] = useState({
      ...mockRouter,
      ...(options?.router || {}),
    });

    return (
      <RouterContext.Provider value={nextRouter}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </RouterContext.Provider>
    );
  }

  return AllTheProviders;
}

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: createAllTheProviders(options) });

export * from '@testing-library/react';

export { customRender as render };

type RenderOptions = {
  router?: Partial<NextRouter>;
};
