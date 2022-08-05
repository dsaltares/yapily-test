import type { PropsWithChildren } from 'react';
import Header from './Header';

type LayoutProps = PropsWithChildren<{
  title: string;
}>;

const Layout = ({ title, children }: LayoutProps) => (
  <div className="flex flex-col items-center gap-8">
    <Header />
    <main className="max-w-prose w-full mx-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      {children}
    </main>
  </div>
);

export default Layout;
