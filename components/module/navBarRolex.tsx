'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {FaPhoneAlt, FaUser} from "react-icons/fa";
import MenuNavNar from "@/components/module/MenuNavNar";


export const RolexNavbar = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change",(latestValue) => {
        const previous= scrollY.getPrevious();
        if (!previous) return;
        if (latestValue > previous && latestValue > 100) {
            setHidden(true);
        }else if (latestValue < previous) {
            setHidden(false);
        }


    });

    return (
        <motion.nav
            variants={{
                hidden: { y: -140 },
                visible: { y: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.25,ease: "easeInOut"}}
            className="
            sticky
            top-0
            w-full
            px-4
            py-2
            z-50
            bg-gradient-to-r
            from-rolexStart
            to-rolexEnd
            flex
            items-center
            justify-between
            transition-transform
            duration-300
            text-white
            font-serif
            ">
            <div className="
            pl-2
            md:pl-14
            lg:pl-24
            flex-1 space-x-8 flex justify-start">
                {/* Liens de navigation à gauche */}
                <div className="flex items-center p-1 hover:text-gray-300">
                    <MenuNavNar/>
                </div>
            </div>

            <div className="flex-none">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={85} height={85}/></Link>
            </div>

            <div className="
            flex-1
            flex
            justify-end
             space-x-8
             pr-2
            md:pr-14
            lg:pr-24
            ">
                {/* Liens de navigation à droite */}
                <Link href="/#contact">
                    <div className="flex items-center">
                        <FaPhoneAlt />
                        <p className="hidden lg:inline-block px-2 py-1 hover:text-gray-300">
                            Contact
                        </p>
                    </div>
                </Link>
                <Link href="/dashboard">
                <div className="flex items-center">
                    <FaUser/>
                    <p className="hidden lg:inline-block px-2 py-1 hover:text-gray-300">
                        Compte
                    </p>
                </div>
            </Link>
            </div>
        </motion.nav>
    );
};
export default RolexNavbar;