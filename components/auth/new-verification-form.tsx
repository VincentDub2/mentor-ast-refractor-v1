"use client";

import {useCallback, useEffect, useState} from "react";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import { useRouter } from 'next/navigation'

import {newVerification} from "@/actions/new-verification";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {toast} from "@/components/ui/use-toast";
import {GrFormCheckmark, GrFormClose} from "react-icons/gr";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Le token est manquant!");
      return;
    }

    newVerification(token)
        .then((data) => {
            if (data.error) {
                setError(data.error);

            }else if (data.success) {
                setSuccess(data.success);
                toast({
                    title: "Succès",
                    description: (
                        <div className="w-[240px] flex flex-row">
                            <GrFormCheckmark className="text-green-700 "/>
                            <p className="text-xl text-neutral-900">Votre email a été confirmé avec succès!
                            </p>
                        </div>
                    ),
                })
                router.push('/sign');

            }
        })
        .catch(() => {
            setError("Something went wrong!");
        })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
      <Card>
        <CardHeader className="space-y-1">
          <h2 className="text-xl font-semibold">Confirmation de l&apos;email</h2>
          <p className="text-sm text-gray-500">Veuillez confirmer votre email</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center w-full justify-center">
            {!success && !error && (
                <BeatLoader/>
            )}
            <FormSuccess message={success}/>
            {!success && (
                <FormError message={error}/>
            )}
          </div>
        </CardContent>
          <CardFooter className="flex flex-col justify-center space-y-2">
              <Link href={"/auth/login"}>
                    <p className="text-neutral-900 text-xs underline">Retour à la connexion</p>
                </Link>
            </CardFooter>
      </Card>
  );
}