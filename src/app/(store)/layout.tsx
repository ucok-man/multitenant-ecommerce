import { ReactNode } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

type Props = {
  children: ReactNode;
};

export default function StoreLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
