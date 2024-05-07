interface SignDataTypes {
  user: {
    user_id: string;
    user_password: string;
    user_password_confirm: string;
  };
  business: {
    name_of_company: string;
    business_registration_number: string;
    name_of_representative: string;
    resident_registration_number: string;
    business_address: string;
    date_of_business_commencement: string;
    type_of_business: string;
    main_number: string;
  };
}
