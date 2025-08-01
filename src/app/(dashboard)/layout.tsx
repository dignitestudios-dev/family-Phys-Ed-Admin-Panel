import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex gap-4 h-screen bg-[#2c2c2e]">
      <div className="py-6 pl-6">
        <Sidebar />
      </div>
      <div className="py-6 pr-6 flex flex-col flex-1 h-full overflow-hidden">
        <Topbar />
        <div className="bg-[#2c2c2e] mt-4 w-full h-full flex-1 flex flex-col gap-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
