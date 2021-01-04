export interface CountryModel {
  alpha2Code: string;
  altSpellings: string[];
  flag: string;
  name: string;
  nativeName: string;
  count: number;
  total: number;
}

export interface CountryResponseModel {
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: string[];
  capital: string;
  demonym: string;
  flag: string;
  name: string;
  nativeName: string;
}
