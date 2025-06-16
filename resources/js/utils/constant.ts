import { toast } from "sonner";
import { SelectOption } from "./select";
import { VisitOptions } from '@inertiajs/core';

export const bank_type: SelectOption[] = [
    { label: 'Konvensional', value: 'conventional' },
    { label: 'Syariah', value: 'sharia' },
];

export const per_page: SelectOption[] = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
];
export const tax_type: SelectOption[] = [
    { label: 'Percentage (%)', value: 'percentage' },
    { label: 'Fixed (Rp)', value: 'fixed' },
];

export const agreement_status: SelectOption[] = [
    { label: 'Created', value: 'created' },
    { label: 'Sent', value: 'sent' },
    { label: 'Signed', value: 'signed' },
    { label: 'Paid', value: 'paid' },
    { label: 'Reported', value: 'reported' },
];

export const term_status: SelectOption[] = [
    { label: 'Created', value: 'created' },
    { label: 'Ready to Process', value: 'ready_to_process' },
    { label: 'Processed', value: 'processed' },
    { label: 'Paid', value: 'paid' },
];

export const FormResponse: VisitOptions = {
    onSuccess: (res) => {
        toast.success('Success...');
    },
    onError: (err) => {
        toast.error(JSON.stringify(err));
    },
};

export const BaseFilter = {
    page: 1,
    per_page: 10,
};