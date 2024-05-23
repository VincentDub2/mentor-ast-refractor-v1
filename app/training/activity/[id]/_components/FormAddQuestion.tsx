'use client';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {QuestionSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {toast} from "@/components/ui/use-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {addQuestionAction} from "@/actions/question";

interface AddQuestionFormProps {
    ExerciseId: number;
}
const AddQuestionForm : React.FC<AddQuestionFormProps>= (
    {ExerciseId}
) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            text: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            explanation: "",
            correctAnswerId: "A",
        },
    });

    const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
        setError("");
        setSuccess("");
        console.log("onSubmit called", values);
        console.log("subjectId", ExerciseId);
        if (!ExerciseId) {
            return setError("Missing subjectId!");
        }
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            ),
        })

        startTransition(() => {
            addQuestionAction(values,ExerciseId).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
            }
        );
    })};
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Question"
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="px-8">
                    <FormField
                        control={form.control}
                        name="optionA"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Options A</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Explanation"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="optionB"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Options B</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Explanation"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="optionC"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option C</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Explanation"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="optionD"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option D</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Explanation"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="optionE"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option E</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Explanation"
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
                    name="correctAnswerId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correct answer</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Correct answer" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                    <SelectItem value="C">C</SelectItem>
                                    <SelectItem value="D">D</SelectItem>
                                    <SelectItem value="E">E</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Explication</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Explanation"
                                    type="text"
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
    );
}

export default AddQuestionForm;