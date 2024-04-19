'use client'
import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {SectionVideoSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {addSectionVideoAction} from "@/actions/sectionVideo";
import {GrFormCheckmark} from "react-icons/gr";

interface DialogFormSectionVideoProps {
    subjectId: number;

}

export function DialogFormSectionVideo({subjectId}: DialogFormSectionVideoProps) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SectionVideoSchema>>({
        resolver: zodResolver(SectionVideoSchema),
        defaultValues: {
        },
    });
    const onSubmit = (values: z.infer<typeof SectionVideoSchema>) => {
        setError("");
        setSuccess("");
        if (!subjectId) {
            return setError("Missing subjectId!");
        }

        startTransition(() => {
            addSectionVideoAction(values,subjectId).then((data) => {
                if (data?.error) {
                    setError(data.error);
                    toast({
                        title: "Erreur",
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                            </pre>
                        ),
                    })
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                    toast({
                        title: "La section a été ajoutée avec succès",
                        description: (
                           <div className="w-[240px] flex flex-row">
                               <GrFormCheckmark className="text-green-700"/> <p>La section a été ajoutée avec succès</p>
                           </div>
                        ),
                    })
                }
            });
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Ajouter une section?</DialogTitle>
            </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Name of subject"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Description of subject"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Position de la section"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button type="submit" disabled={isPending} variant="green" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
        </DialogContent>
    );
}