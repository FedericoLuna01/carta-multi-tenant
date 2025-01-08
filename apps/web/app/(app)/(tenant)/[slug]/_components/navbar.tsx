import { type UserSettings } from "@prisma/client";
import { FullData, UserNoPass } from "@/types/types";
import CommandSearch from "@/components/command-search";
import CartModal from "@/components/modals/cart-modal";

const Navbar = async ({
  userSettings,
  slug,
  products,
  user,
}: {
  userSettings: UserSettings | null,
  slug: string,
  products: FullData[],
  user: UserNoPass
}) => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 border-b border-border bg-white z-50">
      <nav className="max-w-5xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 capitalize">{slug}</h1>
        <div className="flex items-center space-x-4">
          <CommandSearch user={user} products={products} />
          {
            user.isPremium && <CartModal userSettings={userSettings} />
          }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
