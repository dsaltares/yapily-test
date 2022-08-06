import Link from 'next/link';

const Header = () => (
  <header className="w-full py-6 text-4xl font-bold bg-primary text-secondary flex justify-center">
    <Link href="/">
      <a>Yapily Banking App</a>
    </Link>
  </header>
);

export default Header;
