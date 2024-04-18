import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {FaInstagram, FaLinkedin, FaYoutube} from "react-icons/fa";
import Image from "next/image";


const ContactDetails = () => {
    return (
            <Card className="
            bg-gradient-to-r
            from-rolexStart
            to-rolexEnd
            h-[650px]
            w-fit
            md:w-2/3
            md:ml-28
            ">
                <CardHeader>
                    <div className="flex justify-center pt-10">
                        <Image src="/logo.png" alt="logo" height={200} width={200}/>
                    </div>
                </CardHeader>
                    <div>
                        <CardContent className="text-white space-y-4">
                            <div className="flex flex-col text-lg justify-center w-full">
                                <p>Mentor</p>
                                <p>1 rue de la Paix</p>
                                <p>34160, Montpellier</p>
                            </div>
                           <div className="flex flex-col text-lg">
                                 <p>06 12 34 56 78</p>
                           </div>
                            <p className="text-sm">
                                Numéro uniquement disponible par message afin de convenir d&apos;un rendez-vous telephonique.
                            </p>
                        </CardContent>
                        <CardContent className="flex flex-row text-white space-x-4">
                            <FaInstagram size={32}/>
                            <FaLinkedin size={32} />
                            <FaYoutube size={32}/>
                        </CardContent>

                    </div>
            </Card>
    );
}

export default ContactDetails;