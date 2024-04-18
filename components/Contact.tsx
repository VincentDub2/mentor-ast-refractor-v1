'use client';
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import * as z from "zod";
import {ContactUsSchema} from "@/schemas";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {contactUs} from "@/actions/contact";
import PhoneInput from "react-phone-number-input/react-hook-form-input";

const niveauxEtude = [
    { name: 'Baccalauréat', value: 'bac' },
    { name: 'Licence 1', value: 'l1' },
    { name: 'Licence 2', value: 'l2' },
    { name: 'Master 1', value: 'm1' },
    { name: 'Master 2', value: 'm2' },
    { name: 'Doctorat', value: 'doc' },
    {name: 'Ingénieur', value: 'ing'}
];

const anneesConcours = [
    { name: '2024', value: '2024' },
    { name: '2025', value: '2025' },
    { name: '2026', value: '2026' },
];
const Contact = () => {
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ContactUsSchema>>({
        resolver: zodResolver(ContactUsSchema),
    });

    const onSubmit = (values: z.infer<typeof ContactUsSchema>) => {
        startTransition(() => {
            contactUs(values).then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                        toast({
                            title: "Une erreur s'est produite:",
                            description: (
                                <pre className="mt-2 w-[340px] rounded-md shadow p-4">
                                    <p>{error}</p>
                                 </pre>
                            ),
                        })
                    }
                    if (data?.success) {
                        form.reset();
                        toast({
                            title: "Votre message a bien été envoyé:",
                            description: (
                                <pre className="mt-2 w-[340px] rounded-md shadow p-4">
                                    <p>Nous allons bientôt vous recontacter</p>
                                </pre>
                            ),
                        })
                    }
                }
            );
        });
    };

    return (
        <Card className="md:mx-8 lg:mr-28">
            <CardHeader>
                <h2 className=" flex justify-center text-2xl font-semibold">Contactez-nous</h2>
            </CardHeader>
            <CardContent>
                <div className="max-w-2xl mx-auto p-6 bg-white">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Nom"
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Prénom"
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Email"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numéro de téléphone</FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                {...field}
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Entrer votre numéro de téléphone"
                                                defaultCountry="FR"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code postal</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Code postal"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="studyLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Niveau d&apos;étude en 2024/25</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Niveau d'etude en 2024/25" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {niveauxEtude.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>{option.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="yearContest"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Année du concours</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Année du concours" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {anneesConcours.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>{option.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} name="message" placeholder="Posez ici votre question" rows={4}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending} variant="green" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>

        </Card>
    );
}

export default Contact;