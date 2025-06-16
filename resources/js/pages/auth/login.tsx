import { GuestLayout } from "@/layouts/guest-layout";
import { FormResponse } from "@/utils/constant";
import { Link, useForm } from "@inertiajs/react";
import { IconPerson } from "justd-icons";
import React, { FormEvent, useEffect } from "react";
import { Toaster } from "sonner";
import { Button, TextField } from "ui";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("auth.attempt"), FormResponse);
    };

    return (
        <>
            <Toaster />
            <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="lg:p-8">
                    <form
                        onSubmit={submit}
                        className="mx-auto flex w-full flex-col justify-center sm:max-w-md"
                    >
                        <div className="flex flex-col space-y-2 text-center mb-4">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login Akun
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Hi, Selamat Datang #SahabatTravel
                            </p>
                        </div>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("email", v)}
                            errorMessage={errors.email}
                            isRequired
                            className="mb-2 hover:border-template"
                        />
                        <TextField
                            isRevealable
                            label="Password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("password", v)}
                            errorMessage={errors.password}
                            isRequired
                            className="mb-2"
                        />
                        <div className="flex items-center mt-2">
                            <Link href="#">
                                <p className="text-template hover:underline text-sm">
                                    Forgot Password?
                                </p>
                            </Link>
                        </div>
                        <Button
                            isDisabled={processing}
                            className="mt-3 bg-template"
                            type="submit"
                        >
                            <IconPerson />
                            Login
                        </Button>
                    </form>
                </div>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <img
                        className="absolute inset-0 h-screen object-cover w-full"
                        src="/assets/bus.svg"
                        alt="Bus"
                    />
                    <div className="absolute inset-0 h-screen w-full bg-zinc-900 opacity-50" />
                    <div className="relative z-20 flex items-center text-lg font-medium"></div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg"></p>
                            <footer className="text-sm"></footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = (page: React.ReactNode) => <GuestLayout children={page} />;
