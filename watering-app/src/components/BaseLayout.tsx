import NavigationBar from "@/components/NavigationBar";
import SearchBar from "./SearchBar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <main className="bg-lime-200">
        {children}
        <div className="flex justify-between">
          <NavigationBar />
        </div>
        <div className="block">
          <SearchBar />
        </div>
      </main>
    </>
  );
};

export default BaseLayout;
