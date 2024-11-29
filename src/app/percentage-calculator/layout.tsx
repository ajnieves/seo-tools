import './styles.css';

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="calculator-layout">
      {children}
    </main>
  );
}
