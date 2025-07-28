import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="flex items-center justify-center h-screen overflow-hidden relative">
      <Image src={"/images/ft.png"} alt="bg" width={1700} height={1200} className="absolute z-0 w-screen h-screen object-cover " />
      <div className="top-0 left-0 absolute bg-gradient-to-r shadow-inner from-[#161411] via-black/80 to-[#161411] z-10 h-screen w-screen" ></div>

      <div className="w-full flex flex-col justify-center items-center gap-5 z-50">
        {children}
      </div>
    </div>
  );
}
