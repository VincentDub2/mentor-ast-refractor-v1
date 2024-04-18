import {Logo} from "@/components/logo";
import {Button} from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="bottom-0 z-30 w-full p-2 border-t bg-gradient-to-r
            from-rolexStart
            to-rolexEnd">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="white_ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="white_ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
