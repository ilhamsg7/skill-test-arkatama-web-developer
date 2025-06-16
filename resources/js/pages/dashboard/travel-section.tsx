import { Travel } from "@/types/travel";
import { Button, Modal, TextField } from "@/components/ui";
import { CalendarDays, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base } from "@/types/base";
import { router, useForm } from "@inertiajs/react";

interface TravelFormData {
    name: string;
    departure_date: string;
    departure_time: string;
    quota: string;
}

type TravelProps = {
    initialTravel?: Travel[];
};

export const TravelSection = ({ initialTravel }: TravelProps) => {
    const [travels, setTravels] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors } = useForm<TravelFormData>(
        {
            name: "",
            quota: "",
            departure_date: "",
            departure_time: "",
        },
    );

    useEffect(() => {
        if (initialTravel) {
            setTravels(initialTravel);
        }
    }, [initialTravel]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            ...data,
            quota: parseInt(data.quota.toString()), // Ensure quota is a number
        };

        post(route("dashboard.travel.store"), {
            onSuccess: () => {
                window.location.reload();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

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
                        className="bg-template items-center gap-2"
                        onPress={() => setShowModal(true)}
                    >
                        <span>+</span>
                        Add Service
                    </Button>

                    <Modal
                        isOpen={showModal}
                        onOpenChange={() => setShowModal(false)}
                    >
                        <Modal.Content size="4xl">
                            <Modal.Header>
                                <Modal.Title>Add New Service</Modal.Title>
                                <Modal.Description>
                                    Fill in the service details
                                </Modal.Description>
                            </Modal.Header>
                            <Modal.Body>
                                <form
                                    className="grid grid-cols-12 gap-4"
                                    onSubmit={handleSubmit}
                                >
                                    <TextField
                                        label="Service Name"
                                        placeholder="Enter service name"
                                        value={data.name}
                                        onChange={(value) =>
                                            setData("name", value)
                                        }
                                        className="col-span-12"
                                        isRequired
                                    />

                                    <TextField
                                        label="Quota"
                                        type="number"
                                        placeholder="Enter passenger quota"
                                        value={data.quota.toString()}
                                        onChange={(value) =>
                                            setData("quota", value)
                                        }
                                        className="col-span-4"
                                        isRequired
                                    />

                                    <TextField
                                        label="Departure Date"
                                        type="date"
                                        value={data.departure_date}
                                        onChange={(value) =>
                                            setData("departure_date", value)
                                        }
                                        className="col-span-4"
                                        isRequired
                                    />

                                    <TextField
                                        label="Departure Time"
                                        type="time"
                                        value={data.departure_time}
                                        onChange={(value) =>
                                            setData("departure_time", value)
                                        }
                                        className="col-span-4"
                                        isRequired
                                    />

                                    <div className="col-span-12 flex justify-end gap-2 mt-4 mb-4">
                                        <Button
                                            type="button"
                                            intent="outline"
                                            onPress={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-template"
                                            isDisabled={processing}
                                        >
                                            Save Service
                                        </Button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initialTravel.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg border"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500">Detail</p>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                    Quota: {item.quota}
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
