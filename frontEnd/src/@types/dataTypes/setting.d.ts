interface SettingTypes {
  business_setting: BusinessSettingTypes;
  rank_setting: RankSettingTypes[];
  position_setting: PositionDataTypes[];
}

interface BusinessSettingTypes {
  name_of_company: string;
  business_registration_number: string;
  name_of_representative: string;
  resident_registration_number: string;
  business_address: string;
  date_of_business_commencement: string;
  type_of_business: string;
  main_number: string;
}

interface RankSettingTypes {
  order: number;
  value: string;
}

interface PositionSettingTypes {
  id: number;
  name: string;
}
