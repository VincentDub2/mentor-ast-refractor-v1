import RolexNavbar from "@/components/module/navBarRolex";
import {Footer} from "@/components/module/footer";

const AuthLayout = ({
  children
}: { 
  children: React.ReactNode
}) => {
  return (
      <div className="flex flex-col min-h-screen">
          <RolexNavbar/>
          <div className="flex-grow flex items-center justify-center">
              {children}
          </div>
          <Footer/>
      </div>
  );
}

export default AuthLayout;