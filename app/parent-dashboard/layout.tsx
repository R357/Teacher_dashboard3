import ParticlesBackground from '../student-dashboard/components/ParticlesBackground';

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900" />
      <ParticlesBackground />
      {children}
    </div>
  );
}


