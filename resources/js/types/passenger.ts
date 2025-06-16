import { Travel } from "./travel";

export type Passenger = {
    id: number;
    name: string;
    travel_id: string;
    travel: Travel;
    gender?: string;
    city: string;
    age: string;
    birth_year: string;
}
