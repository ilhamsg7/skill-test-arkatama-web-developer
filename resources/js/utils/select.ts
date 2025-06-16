import { Base } from '@/types/base';
import { Travel } from '@/types/travel';
import axios from 'axios';

export type SelectOption = {
  value: any;
  label: any;
};

export const fetchTravel = async (search: any): Promise<SelectOption[]> => {
  const response = await axios.get<Base<Travel[]>>(route('dashboard.travel.fetch'), {
    params: { 'filter[name]': search }
  });

  return (response.data.items ?? []).map((e: Travel) => ({
    value: e.id,
    label: e.name
  }));
};

export const fetchGender= async (search: any): Promise<SelectOption[]> => {
  return [
    {
      value: "L",
      label: "Laki-laki"
    },
    {
      value: "P",
      label: "Perempuan"
    }
  ];
};

