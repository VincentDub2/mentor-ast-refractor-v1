import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {HiMenuAlt4} from "react-icons/hi";
import Link from "next/link";
import {LogoutButton} from "@/components/auth/logout-button";
import {useSession} from "next-auth/react";


function MenuNavNar() {

    const { data: session } = useSession()

      return (
          <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row items-center">
                  <HiMenuAlt4 className="text-2xl"/>
                  <p className="hidden lg:inline-block text-sans px-2 py-1">
                      Menu
                  </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {
                        session ? (
                            <>
                                <DropdownMenuItem>
                                    <Link href={"/profile"}>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/dashboard"}>
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LogoutButton>
                                        Déconnexion
                                    </LogoutButton>

                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem>
                                <Link href={"/login"}>
                                    Login
                                </Link>
                            </DropdownMenuItem>
                        )
                  }
            </DropdownMenuContent>
          </DropdownMenu>

      );
    }

export default MenuNavNar;