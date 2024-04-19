import {Footer} from "@/components/module/footer";
import RolexNavbar from "@/components/module/navBarRolex";

export default function AST1Layout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <RolexNavbar />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}