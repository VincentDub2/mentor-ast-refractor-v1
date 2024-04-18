"use client"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import {LoginCardForm} from "@/components/auth/login-card-form";
import {RegisterCardForm} from "@/components/auth/register-card-form";

export default function Sign() {

    return (
        <div className="flex items-center justify-center pt-20">
            <Tabs defaultValue="sign-in" className="w-[400px]">
                <TabsList className="w-full">
                    <TabsTrigger  className="w-full" value="sign-in">Connexion</TabsTrigger>
                    <TabsTrigger className="w-full" value="sign-up">Inscription</TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">
                    <LoginCardForm/>
                </TabsContent>
                <TabsContent value="sign-up">
                    <RegisterCardForm/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
