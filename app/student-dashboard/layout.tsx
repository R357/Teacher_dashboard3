export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
      {children}
    </div>
  );
}

