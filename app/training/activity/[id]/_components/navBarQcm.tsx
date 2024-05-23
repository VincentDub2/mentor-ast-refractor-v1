'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {FaClock} from "react-icons/fa";
import {Progress} from "@/components/ui/progress";
import {ImCross} from "react-icons/im";
import {BiMath} from "react-icons/bi";
import Timer from "@/app/training/activity/[id]/_components/Timer";


interface QcmNavBarProps {
    progress: number;
}
export const QcmNavBar : React.FC<QcmNavBarProps> = (
    { progress }
    ) => {
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
            min-h-20
            ">
            <div className="
            pl-2
            flex-1 space-x-8 flex justify-start">
                {/* Liens de navigation à gauche */}
                <div className="flex items-center p-1 hover:text-gray-300">
                    <BiMath/>
                    <p className="hidden lg:inline-block px-2 py-1 hover:text-gray-300">
                        Math
                    </p>
                </div>
            </div>
            <Progress className="w-3/5" value={progress}/>
            <div className="
            flex-1
            flex
            justify-end
             space-x-8
             pr-2

            ">
                {/* Liens de navigation à droite */}
                <Link href="/sign">
                    <div className="flex items-center border-white border-2 rounded-full px-3">
                        <FaClock />
                        <Timer/>
                    </div>
                </Link>
                <Link href="/public#contact">
                    <div className="flex items-center">
                        <ImCross />
                        <p className="hidden lg:inline-block px-2 py-1 hover:text-gray-300">
                            Quitter
                        </p>
                    </div>
                    </Link>
            </div>
        </motion.nav>
    );
};
export default QcmNavBar;