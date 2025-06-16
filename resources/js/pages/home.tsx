import { Card } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { number_format, today_date_format } from "@/utils/format";

export default function Home({}) {
    return (
        <>
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
                            <span className="text-4xl font-semibold">500</span>
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
        </>
    );
}

Home.layout = (page: React.ReactNode) => <AppLayout children={page} />;
