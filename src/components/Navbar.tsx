import Button from '@/components/Button';

interface NavbarProps {
  handleCreate: () => void;
  handleLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({handleCreate, handleLogout}) => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-lg mx-auto flex items-center w-full justify-between">
        <p className="font-bold">Easy Board</p>
      </div>
      <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
        <Button onClick={handleCreate}>Create</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};
