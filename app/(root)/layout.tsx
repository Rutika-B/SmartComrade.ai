import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { checkSubscription } from "@/lib/subscription";

const RootLayout = async({ children }: { children: React.ReactNode }) => {
  const isPro=await checkSubscription();
  return (
    <div className="h-full">
      <Navbar isPro={isPro}/>
      <div className="hidden md:flex mt-16 w-40 flex-col fixed insert-y-0 h-full">
        <Sidebar isPro={isPro} />
      </div>
      <main className="md:pl-40 pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
