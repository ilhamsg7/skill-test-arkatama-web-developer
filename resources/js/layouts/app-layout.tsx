import {
    Avatar,
    Button,
    Menu,
    Sidebar,
    SidebarContent,
    SidebarDisclosure,
    SidebarDisclosureGroup,
    SidebarDisclosurePanel,
    SidebarDisclosureTrigger,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarItem,
    SidebarLabel,
    SidebarNav,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui";
import { PagePropsData } from "@/types";
import { FormResponse } from "@/utils/constant";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    IconBell,
    IconCalendarCheck,
    IconChartAnalytics,
    IconChevronLgDown,
    IconLogout,
    IconServerStack,
} from "justd-icons";
import { LayoutGrid, MessageSquare } from "lucide-react";
import { FormEvent, PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const AppLayout = (props: PropsWithChildren) => {
    const { post } = useForm<any>();
    const { auth } = usePage<PagePropsData>().props;

    const onLogout = (e: FormEvent) => {
        e.preventDefault();
        post(route("auth.logout"), FormResponse);
    };

    const base_sidebar = {
        icon: LayoutGrid,
        label: "Master Data",
        items: [
            {
                label: "Dashboard",
                icon: LayoutGrid,
                href: "",
            },
        ],
    };

    return (
        <SidebarProvider>
            <Sidebar intent="default" collapsible="dock" className="bg-white">
                <SidebarHeader>
                    <Link
                        className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
                        href={route("dashboard.index")}
                    >
                        <img
                            src="/assets/icon-bar.svg"
                            className="w-5 h-5"
                            alt="Logo Icon"
                        />
                        <SidebarLabel className="font-medium">
                            Console
                        </SidebarLabel>
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarDisclosureGroup>
                        <SidebarDisclosure id={1}>
                            <SidebarDisclosureTrigger>
                                <base_sidebar.icon className="text-black size-4 mr-1.5" />
                                <SidebarLabel className="font-medium text-black">
                                    {base_sidebar.label}
                                </SidebarLabel>
                            </SidebarDisclosureTrigger>
                            <SidebarDisclosurePanel>
                                {base_sidebar.items.map((item, index) => (
                                    <SidebarItem key={index} href={item.href}>
                                        {() => (
                                            <>
                                                <item.icon className="hover:text-black size-4 mr-1.5" />
                                                <SidebarLabel className="hover:text-black">
                                                    {item.label}
                                                </SidebarLabel>
                                            </>
                                        )}
                                    </SidebarItem>
                                ))}
                            </SidebarDisclosurePanel>
                        </SidebarDisclosure>
                    </SidebarDisclosureGroup>
                </SidebarContent>

                <SidebarFooter>
                    <Menu>
                        <Menu.Trigger
                            aria-label="Profile"
                            data-slot="menu-trigger"
                        >
                            <Avatar
                                shape="square"
                                src="https://gravatar.com/avatar/6e088c3cf35987ad4e3dfc90e7b8dec6?s=400&d=identicon&r=x"
                            />
                            <div className="text-sm group-data-[collapsible=dock]:hidden">
                                {auth?.user?.name ?? "-"}
                                <span className="block -mt-0.5 text-muted-fg">
                                    {auth?.user?.email ?? "-"}
                                </span>
                            </div>
                            <IconChevronLgDown className="absolute right-3 transition-transform size-4 group-pressed:rotate-180" />
                        </Menu.Trigger>
                        <Menu.Content
                            placement="bottom right"
                            className="sm:min-w-(--trigger-width)"
                        >
                            <Menu.Section>
                                <Menu.Header separator>
                                    <span className="block">
                                        {auth?.user?.name ?? "-"}
                                    </span>
                                    <span className="font-normal text-muted-fg">
                                        #SahabatTravel
                                    </span>
                                </Menu.Header>
                            </Menu.Section>

                            <Menu.Item>
                                <IconLogout />
                                <button
                                    onClick={onLogout}
                                    className="flex w-full"
                                >
                                    Log out
                                </button>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset className="overflow-hidden">
                <SidebarNav className="flex justify-between w-full">
                    <span className="flex gap-x-4 items-center justify-between w-full">
                        <SidebarTrigger className="-mx-2" />
                        <Button intent="outline" size="extra-small">
                            <IconChartAnalytics />
                        </Button>
                    </span>
                </SidebarNav>
                <div className="flex">
                    <div className="p-5 overflow-x-hidden h-full flex-1">
                        <Toaster />
                        {props.children}
                    </div>

                    <div className="w-80 border-l border-gray-200 p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Hello,
                                    </h2>
                                    <p className="text-lg">
                                        {auth?.user?.name}!
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Copy your bio link and paste it in your profile to let people find you.
                                    </p>
                                </div>
                                <Avatar
                                    shape="circle"
                                    size="large"
                                    src="https://gravatar.com/avatar/6e088c3cf35987ad4e3dfc90e7b8dec6?s=400&d=identicon&r=x"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">Reminders</h3>
                                    <Link
                                        href="#"
                                        className="text-blue-500 text-sm"
                                    >
                                        View All
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                        <div className="bg-red-100 p-2 rounded-lg">
                                            <IconCalendarCheck className="text-red-500 w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                Booking Reminder
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Lorem ipsum dolor sit amet
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                        <div className="bg-yellow-100 p-2 rounded-lg">
                                            <MessageSquare className="text-yellow-500 w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                New Message
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Lorem ipsum dolor sit amet
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <IconBell className="text-blue-500 w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                Upcoming Booking
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Lorem ipsum dolor sit amet
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
