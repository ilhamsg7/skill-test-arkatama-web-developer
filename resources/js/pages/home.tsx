import { Card, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { number_format, today_date_format } from "@/utils/format";
import { PassengerSection } from "./dashboard/passenger-section";
import { TravelSection } from "./dashboard/travel-section";
import { Travel } from "@/types/travel";
import { Passenger } from "@/types/passenger";
import { useState } from "react";

type DashboardProps = {
    travel?: Travel;
    passengers?: Passenger[];
};

export default function Home({ totalBooking, travel, passengers }) {
    const [selectedTab, setSelectedTab] = useState("booking");

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-gray-600">Welcome Back</p>
                </div>
            </div>
            <div className="mt-8">
                <h1 className="text-xl font-semibold">Quick Stats</h1>
                <div className="grid grid-cols-12 gap-3 mt-4">
                    <Card className="col-span-3">
                        <Card.Header>
                            <Card.Title className="text-lg">
                                Total Booking
                            </Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <span className="text-4xl font-semibold">
                                {totalBooking}
                            </span>
                        </Card.Content>
                    </Card>
                    <Card className="col-span-3">
                        <Card.Header>
                            <Card.Title className="text-lg">
                                Pending Approval
                            </Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <span className="text-4xl text-red-500 font-semibold">
                                100
                            </span>
                        </Card.Content>
                    </Card>
                    <Card className="col-span-3">
                        <Card.Header>
                            <Card.Title className="text-lg">
                                New Clients this Month
                            </Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <span className="text-4xl font-semibold">57%</span>
                        </Card.Content>
                    </Card>
                    <Card className="col-span-3">
                        <Card.Header>
                            <Card.Title className="text-lg">
                                Returning Clients
                            </Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <span className="text-4xl font-semibold">7%</span>
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div className="mt-8">
                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(String(key))}
                >
                    <Tabs.List>
                        <Tabs.Tab id="booking">Bookings</Tabs.Tab>
                        <Tabs.Tab id="service">My Service</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel id="booking">
                        <PassengerSection initialPassengers={passengers} />
                    </Tabs.Panel>
                    <Tabs.Panel id="service">
                        <TravelSection travelInit={travel} />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <AppLayout children={page} />;
