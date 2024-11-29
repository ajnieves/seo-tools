import { generateMetadata } from '../metadata';

export const metadata = generateMetadata('entityAnalyzer');

export default function EntityAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
