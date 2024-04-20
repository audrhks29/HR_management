interface SettingTypes {
  business_setting: BusinessSettingTypes;
  commute_setting: CommuteSettingTypes[];
  rank_setting: RankSettingTypes[];
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

interface CommuteSettingTypes {
  name: string;
  setting: { id: number; value: string }[];
}

interface RankSettingTypes {
  order: number;
  value: string;
}
