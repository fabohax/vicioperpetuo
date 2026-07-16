import React, { useMemo, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

const countryNames = new Intl.DisplayNames(['es'], { type: 'region' });

const COUNTRIES = getCountries()
  .map((iso) => ({
    iso,
    name: countryNames.of(iso) || iso,
    dialCode: `+${getCountryCallingCode(iso)}`,
  }))
  .sort((first, second) => {
    if (first.iso === 'PE') return -1;
    if (second.iso === 'PE') return 1;
    return first.name.localeCompare(second.name, 'es');
  });

const getFlag = (iso) =>
  iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));

const PhoneCountrySelect = ({ value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedCountry = value || COUNTRIES[0];
  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return COUNTRIES;

    return COUNTRIES.filter((country) => {
      return (
        country.name.toLowerCase().includes(normalizedQuery) ||
        country.dialCode.includes(normalizedQuery) ||
        country.iso.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  const selectCountry = (country) => {
    onChange(country);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4 w-[132px] shrink-0">
      <button
        type="button"
        className="flex h-full min-h-[58px] w-full items-center justify-center gap-2 rounded-lg border border-[#333] bg-black px-3 py-4 text-white hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => setIsOpen((current) => !current)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-label="Seleccionar codigo telefonico"
      >
        <span className="text-lg leading-none" aria-hidden="true">{getFlag(selectedCountry.iso)}</span>
        <span className="text-sm">{selectedCountry.dialCode}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[280px] rounded-lg border border-[#333] bg-black p-2 shadow-2xl">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar pais o codigo"
            className="mb-2 w-full rounded-md border border-[#333] bg-[#080808] px-3 py-2 text-sm text-white outline-none"
            autoFocus
          />
          <div className="max-h-56 overflow-y-auto custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={`${country.iso}-${country.dialCode}`}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-white hover:bg-[#171717]"
                  onClick={() => selectCountry(country)}
                >
                  <span className="text-lg leading-none" aria-hidden="true">{getFlag(country.iso)}</span>
                  <span className="min-w-12">{country.dialCode}</span>
                  <span className="truncate text-[#ddd]">{country.name}</span>
                </button>
              ))
            ) : (
              <p className="px-3 py-2 text-sm text-[#aaa]">Sin resultados</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { COUNTRIES };
export default PhoneCountrySelect;
