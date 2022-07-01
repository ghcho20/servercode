import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      href: '/chat',
      title: 'Dashboard',
    },
    {
      href: '/chat/userlist',
      title: 'Users',
    },
    {
      href: '/chat/channels',
      title: 'Channels',
    },
  ];

  return (
    <div className='min-h-screen flex flex-col text-white'>
      <header className='bg-emerald-600 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase'>
        flybird.com dashboard
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-emerald-600 w-full md:w-60'>
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 bg-emerald-600 rounded hover:bg-emerald-300 cursor-pointer ${
                        router.asPath === href && 'bg-emerald-700'
                      }`}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
