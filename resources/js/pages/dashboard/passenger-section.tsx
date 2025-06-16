import { Passenger } from "@/types/passenger";
import { Button, Modal, TextField } from "@/components/ui";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base } from "@/types/base";
import { useForm } from "@inertiajs/react";
import { CustomSelect } from "@/components/custom-select";
import { fetchGender, fetchTravel } from "@/utils/select";
import { Travel } from "@/types/travel";
import { router } from '@inertiajs/react'

interface PassengerFormData {
    passenger_input: string;
    travel_id: string;
    travel: Travel;
}

type PassengerSectionProps = {
    initialPassengers?: Passenger[]; // menerima array passenger dari parent
};

export const PassengerSection = ({
    initialPassengers,
}: PassengerSectionProps) => {
    const [passengers, setPassengers] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors } =
        useForm<PassengerFormData>({
            passenger_input: "",
            travel_id: "",
            travel: undefined,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("dashboard.passenger.store"), {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    useEffect(() => {
        if (initialPassengers) {
            setPassengers(initialPassengers);
        }
    }, [initialPassengers]);


    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold">Booking Client</h2>
                    <p className="text-gray-500 text-sm">
                        list of all bookings
                    </p>
                </div>
                <Button
                    className="bg-template flex items-center gap-2"
                    onPress={() => setShowModal(true)}
                >
                    <span>+</span>
                    Add Passenger
                </Button>
                <Modal
                    isOpen={showModal}
                    onOpenChange={() => setShowModal(false)}
                >
                    <Modal.Content size="4xl">
                        <Modal.Header>
                            <Modal.Title>Add New Passenger</Modal.Title>
                            <Modal.Description>
                                Fill in the passenger details
                            </Modal.Description>
                        </Modal.Header>
                        <Modal.Body>
                            <form
                                className="grid grid-cols-12 gap-4"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    label="Passenger Details"
                                    placeholder="Example: Arkatama 25 Malang"
                                    value={data.passenger_input}
                                    onChange={(value) =>
                                        setData("passenger_input", value)
                                    }
                                    className="col-span-6"
                                    isRequired
                                />
                                <CustomSelect
                                    label="Travel"
                                    placeholder="Select Travel"
                                    name="travel_id"
                                    onChange={(value) =>
                                        setData("travel_id", value?.value)
                                    }
                                    defaultValue={{
                                        value: data.travel_id,
                                        label: data.travel?.name,
                                    }}
                                    loadOptions={fetchTravel}
                                    className="col-span-6"
                                    isRequired
                                />

                                <div className="col-span-12 flex justify-end gap-2 mb-4">
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
                                        Save Passenger
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialPassengers && initialPassengers.length > 0 ? (
                    passengers.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg border"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">
                                    {item.name}
                                </h3>
                                <div className="text-gray-500 text-sm">
                                    <p>Service</p>
                                    <p>{item.travel?.name || "-"}</p>
                                </div>
                            </div>

                            <div className="flex justify-between mb-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">
                                        Date
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">
                                            {item.travel?.departure_date || "-"}
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
                                            {item.travel?.departure_time || "-"}
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
                                    Close Booking
                                </Button>
                                <Button
                                    intent="outline"
                                    size="small"
                                    className="w-1/2 ml-2"
                                >
                                    Reject
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No bookings found.
                    </div>
                )}
            </div>
        </div>
    );
};
