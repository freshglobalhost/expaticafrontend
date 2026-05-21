declare module "intl-tel-input" {
  export interface CountryData {
    iso2: string;
    dialCode: string;
    name: string;
  }

  export interface IntlTelInputInstance {
    destroy: () => void;
    getNumber: () => string;
    setNumber: (number: string) => void;
    isValidNumber: () => boolean;
    getSelectedCountryData: () => CountryData;
    setCountry: (iso2: string) => void;
    getValidationError: () => number;
  }

  export default function intlTelInput(
    input: HTMLInputElement,
    options?: Record<string, unknown>
  ): IntlTelInputInstance;
}

declare module "intl-tel-input/build/css/intlTelInput.css";
