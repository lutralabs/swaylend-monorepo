import { Footer } from '@/components/Footer';
import { IntroductionDialog } from '@/components/IntroductionDialog';
import { Navbar } from '@/components/Navbar';
import { Providers } from '@/components/Providers';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="h-screen flex flex-col min-h-[calc(100dvh)]">
        <Navbar />
        <div className="bg-background flex-1">{children}</div>
        <Footer />
        <IntroductionDialog />
      </div>
    </Providers>
  );
}
