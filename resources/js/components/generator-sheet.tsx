import { kol_generator_column } from '@/pages/operational/campaign/utils/constant';
import { Base } from '@/types/base';
import { KolHasPlatform } from '@/types/kol_has_platform';
import {
  fetchCity,
  fetchContentCategory,
  fetchContentType,
  fetchKol,
  fetchKolCategory,
  fetchKolType,
  fetchPlatform,
  fetchPlatformType,
  fetchSubcampaign
} from '@/utils/select';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { IconPlus } from 'justd-icons';
import { useState } from 'react';
import { CustomSelect } from './custom-select';
import { NextTable } from './next-table';
import { Button, Sheet } from './ui';

type GeneratorSheetProps = {
  onSelect: (data: any[], platform_type_id, content_type_id) => void;
  campaignId: any;
};

export const GeneratorSheet = ({ onSelect, campaignId }: GeneratorSheetProps) => {
  const [filters, setFilters] = useState<any>({});
  const [selected, setSelected] = useState<any[]>([]);
  const { data, setData, processing } = useForm<any>();

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      platform_type_id,
      content_type_id,
      platform_id,
      kol_id,
      kol_type_id,
      kol_category_id,
      content_category_id,
      city_id
    } = data;

    const contentCategories = Array.isArray(content_category_id) ? content_category_id.join(',') : content_category_id;

    setFilters({
      platform_type_id: platform_type_id,
      content_type_id: content_type_id,
      city_id: city_id,
      'platform.id': platform_id,
      'kol.id': kol_id,
      'kol.content_category_id': contentCategories,
      'kolType.id': kol_type_id,
      'kol.kolCategory.id': kol_category_id
    });

    setSelected([]);
  };

  const fetchDataKol = async (params: Record<string, any>) => {
    const response = await axios.get<Base<KolHasPlatform[]>>(route('backoffice.operational.plan.fetch', params));
    return response.data;
  };

  return (
    <Sheet>
      <Button>
        <IconPlus />
        Add KOL
      </Button>
      <Sheet.Content side="top" isFloat={false}>
        <Sheet.Header>
          <form className=" grid grid-cols-12 gap-4" onSubmit={handleFilterSubmit}>
            <CustomSelect
              label="KOL"
              placeholder="Select a Kol"
              name="kol_id"
              defaultValue={null}
              onChange={(value) => {
                setData('kol_id', value?.value);
                setData('kol_name', value?.label);
              }}
              loadOptions={fetchKol}
              className="col-span-3"
            />
            <CustomSelect
              label="Persona"
              placeholder="Persona"
              name="content_category_id"
              defaultValue={
                Array.isArray(data?.content_category_name)
                  ? data.content_category_name.map((item) => ({
                      value: item.value || '',
                      label: item.label || ''
                    }))
                  : []
              }
              onChange={(values) => {
                const selectedValues = values?.map((option) => option.value) || [];
                const nameSelectedValues =
                  values?.map((option) => ({
                    value: option.value,
                    label: option.label
                  })) || [];

                setData('content_category_id', selectedValues);
                setData('content_category_name', nameSelectedValues);
              }}
              loadOptions={fetchContentCategory}
              className="col-span-3"
              isMulti={true}
            />
            <CustomSelect
              label="Platform"
              placeholder="Select a Platform"
              name="platform_id"
              defaultValue={null}
              onChange={(value) => {
                setData('platform_id', value?.value);
                setData('platform_name', value?.label);
              }}
              loadOptions={fetchPlatform}
              className="col-span-3"
            />
            <CustomSelect
              label="Platform Type"
              placeholder="Select a Platform Type"
              name="platform_type_id"
              defaultValue={null}
              onChange={(value) => {
                setData('platform_type_id', value?.value);
                setData('platform_type_name', value?.label);
              }}
              loadOptions={fetchPlatformType}
              className="col-span-3"
            />
            <CustomSelect
              label="Content Type"
              placeholder="Select a Content Type"
              name="content_type_id"
              defaultValue={null}
              onChange={(value) => {
                setData('content_type_id', value?.value);
                setData('content_type_name', value?.label);
              }}
              loadOptions={fetchContentType}
              className="col-span-3"
            />
            <CustomSelect
              label="KOL Type"
              name="kol_type_id"
              defaultValue={null}
              onChange={(value) => {
                setData('kol_type_id', value?.value);
                setData('kol_type_name', value?.label);
              }}
              loadOptions={fetchKolType}
              className="col-span-3"
            />
            <CustomSelect
              label="KOL Category"
              name="kol_category_id"
              defaultValue={null}
              onChange={(value) => {
                setData('kol_category_id', value?.value);
                setData('kol_category_name', value?.label);
              }}
              loadOptions={fetchKolCategory}
              className="col-span-3"
            />
            <CustomSelect
              label="City"
              placeholder="Select City"
              name="city_id"
              defaultValue={{ value: data.city_id, label: data.city_name }}
              onChange={(value) => {
                setData('city_id', value?.value);
                setData('city_name', value?.label);
              }}
              loadOptions={fetchCity}
              className="col-span-3"
            />
            <div className="col-span-12 flex justify-end mt-6">
              <Link
                className="mr-2"
                href={route('backoffice.master.kol.quick_form', {
                  redirect: route('backoffice.operational.campaign.show', campaignId)
                })}
              >
                <Button intent="outline">Add New KOL</Button>
              </Link>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Sheet.Header>
        <Sheet.Body className="space-y-4 overflow-scroll">
          <div className=" flex flex-col gap-2">
            <div className="overflow-x-auto max-h-60">
              <NextTable
                columns={kol_generator_column}
                fetchData={fetchDataKol}
                filters={filters}
                setFilters={setFilters}
                rowHeader="id"
                enableRowSelection={true}
                onRowSelectionChange={(val) => {
                  setSelected(val);
                }}
              />
            </div>
          </div>
        </Sheet.Body>
        <Sheet.Footer>
          <div className="flex gap-4 mb-10">
            {selected?.length > 0 && (
              <form
                className="flex flex-row gap-2 ms-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSelect(selected, data.platform_type_id, data.content_type_id);
                }}
              >
                <CustomSelect
                  label={null}
                  placeholder="Select Subcampaign"
                  defaultValue={null}
                  onChange={(value) => {
                    setData('subcampaign_id', value?.value);
                  }}
                  loadOptions={() => fetchSubcampaign(campaignId)}
                  className="col-span-6"
                  isRequired
                  menuPlacement="top"
                />
                <Button isDisabled={processing} type="submit">
                  Add {selected.length} Kol
                </Button>
              </form>
            )}
          </div>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  );
};
