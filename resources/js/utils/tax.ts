import { Bracket, TaxDetail } from '@/types/campaign_has_kol';

type Props = {
  tax_details?: TaxDetail[];
  is_tax_gross_up?: boolean;
  price?: number;
  thresshold?: number;
};

const calculate_bracket = (price: number, brackets: Bracket[], is_tax_gross_up: boolean, gross_up: number) => {
  let tax_details = [];
  let total_tax = 0;
  let prev_max = 0;

  for (let i = 0; i < brackets.length; i++) {
    let bracket = brackets[i];
    let taxable = 0;

    if (price > bracket.max_income && bracket.max_income !== null) {
      taxable = bracket.max_income - prev_max;
    } else if (price > prev_max) {
      taxable = price - prev_max;
    }

    let rate = Number(bracket.rate) || 0;

    if (taxable > 0) {
      let amount = is_tax_gross_up ? Math.ceil(taxable / bracket.gross_up - taxable) : taxable * (rate / 100);
      tax_details.push({
        min: bracket.min_income,
        max: bracket.max_income,
        percent: bracket.rate,
        amount: amount
      });
      total_tax += amount;
    }

    // Update previous max
    if (bracket.max_income !== null) {
      prev_max = bracket.max_income;
    } else {
      prev_max = price;
    }

    if (price <= prev_max) {
      break;
    }
  }

  return { tax_details, total_tax };
};

export const calculate_tax = ({ tax_details, is_tax_gross_up, price, thresshold }: Props) => {
  let payload = [];

  let taxs = tax_details.sort((a, b) => a.order - b.order);

  for (let i = 0; i < taxs.length; i++) {
    let value = Number(taxs[i].value) || 0;
    let gross_up = Number(taxs[i].gross_up_value) || 0;
    let pre_tax_rate = Number(taxs[i].pre_tax_rate) || 0;
    let tax_price = taxs[i].order > 0 ? price + payload[i - 1].amount : price;
    let pre_tax_price = pre_tax_rate != 0 ? tax_price * (pre_tax_rate / 100) : tax_price;
    let tax_threshold = Number(taxs[i].threshold) || 0;

    if (taxs[i].is_progressive && thresshold >= tax_threshold) {
      const progressive = calculate_bracket(
        pre_tax_price,
        taxs[i].brackets,
        is_tax_gross_up && taxs[i].gross_up_value != null,
        gross_up
      );
      payload.push({ ...taxs[i], amount: progressive.total_tax });
      continue;
    }
    

    if (is_tax_gross_up && taxs[i].gross_up_value != null) {
      payload.push({ ...taxs[i], amount: Math.ceil(tax_price / gross_up - tax_price) });
    } else {
      payload.push({
        ...taxs[i],
        amount: taxs[i].type == 'percentage' ? Math.ceil(pre_tax_price * (value / 100)) : value
      });
    }
  }

  return payload;
};
