import { format, parseISO } from "date-fns";

export const date_format = (input: string) => {
    return format(parseISO(input), 'dd MMMM yyyy');
}

export const number_format = (input?: string) => {
    return parseFloat(input ?? "0").toLocaleString('id-ID');
}

export const today_date_format = () => {
    return format(new Date(), 'dd MMMM yyyy');
}

export const currency_format = (input: number | string) => {
    return Number(input).toLocaleString("id-ID", {
        useGrouping: true,
        maximumFractionDigits: 0
    }).replace(/,/g, ".");
};

