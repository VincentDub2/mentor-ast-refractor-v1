'use client';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {ExerciseSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {typeDifficulty, typeExercise} from "@prisma/client";
import {toast} from "@/components/ui/use-toast";
import {addExerciseAction} from "@/actions/exercise";

interface AddExerciseFormProps {
    subjectId: number;
}
const AddExerciseForm : React.FC<AddExerciseFormProps>= (
    {subjectId}
) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ExerciseSchema>>({
        resolver: zodResolver(ExerciseSchema),
        defaultValues: {
            name: "",
            type: typeExercise.TRAINING,
            difficulty: typeDifficulty.EASY,
        },
    });

    const onSubmit = (values: z.infer<typeof ExerciseSchema>) => {
        setError("");
        setSuccess("");
        console.log("onSubmit called", values);
        console.log("subjectId", subjectId);
        if (!subjectId) {
            return setError("Missing subjectId!");
        }
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                    <p>{subjectId}</p>
        </pre>
            ),
        })

        startTransition(() => {
            addExerciseAction(values,subjectId).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
            });
        });
    };
    return (
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
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={typeExercise.EXAM} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Exam
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={typeExercise.PRACTICE} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Practice
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={typeExercise.TRAINING} />
                                        </FormControl>
                                        <FormLabel className="font-normal">Training</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={typeDifficulty.EASY} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Easy
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={typeDifficulty.MEDIUM} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Medium
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={typeDifficulty.HARD} />
                                        </FormControl>
                                        <FormLabel className="font-normal">Hard</FormLabel>
                                    </FormItem>
                                </RadioGroup>
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
    );
}

export default AddExerciseForm;