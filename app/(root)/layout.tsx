import { ReactNode} from 'react';
import StreamVideoProvider from '@/providers/StreamClientProvider';
import StoreProvider from '@/providers/StoreProvider';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {

  return (
    <main>
       <StoreProvider><StreamVideoProvider>{children}</StreamVideoProvider></StoreProvider>
    </main>
  );
};

export default RootLayout;`   `