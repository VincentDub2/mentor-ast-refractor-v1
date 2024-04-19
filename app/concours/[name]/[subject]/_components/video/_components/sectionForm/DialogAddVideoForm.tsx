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
import {VideoSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {GrFormCheckmark, GrFormClose} from "react-icons/gr";
import {addVideoAction} from "@/actions/video";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

interface DialogFormAddVideoProps {
    sectionId: number;

}

export function DialogFormAddVideo({sectionId}: DialogFormAddVideoProps) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof VideoSchema>>({
        resolver: zodResolver(VideoSchema),
        defaultValues: {
            title: "",
            description: "",
            youtubeUrl: "",
        },
    });
    const onSubmit = (values: z.infer<typeof VideoSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            addVideoAction(values,sectionId).then((data) => {
                if (data?.error) {
                    setError(data.error);
                    toast({
                        title: "Erreur",
                        description: (
                            <div className="w-[500px] flex flex-col">
                                <div className="flex flex-row">
                                    <GrFormClose className="text-red-600"/>
                                    <p>Erreur lors de ajout</p>
                                </div>
                                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                    <code className="text-white">{JSON.stringify(data.error, null, 2)}</code>
                                </pre>
                            </div>
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
                                <GrFormCheckmark className="text-green-700"/> <p>La section a été ajoutée avec
                                succès</p>
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
                <DialogTitle>Ajouter une video?</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Titre de la video"
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
                        name="youtubeUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="url de la video"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="availableFromDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Video dispo</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
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