import { Travel } from "@/types/travel";
import { Button } from "@/components/ui";
import { CalendarDays, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base } from "@/types/base";

type TravelProps = {
    travelInit?: Travel;
}

export const TravelSection = ({
    travelInit: initialTravel,
}: TravelProps) => {
    const [travels, setTravels] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const fetchTravels = async (params: Record<string, any>) => {
        const response = await axios.get<Base<Travel[]>>(
            route('dashboard.travel.fetch', params)
        );
        return response.data;
    };

    useEffect(() => {
        fetchTravels;
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">My Service</h2>
                        <p className="text-gray-500 text-sm">
                            list of all my service
                        </p>
                    </div>
                    <Button
                        intent="primary"
                        className="flex items-center gap-2"
                    >
                        <span>+</span>
                        Add Service
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {travels.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg border"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">
                                    Trip To {item.name}
                                </h3>
                                <p className="text-gray-500">Detail</p>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                    {item.quota} Passenger
                                </span>
                            </div>

                            <div className="flex justify-between mb-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">
                                        Departure Date
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">
                                            {item.departure_date}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">
                                        Time
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">
                                            {item.departure_time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <Button
                                    intent="outline"
                                    size="small"
                                    className="w-1/2 mr-2"
                                >
                                    Add Passenger
                                </Button>
                                <Button
                                    intent="outline"
                                    size="small"
                                    className="w-1/2 ml-2"
                                >
                                    Close Quota
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
