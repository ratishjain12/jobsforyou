import { forwardRef, useState, useMemo } from "react";
import { Input } from "./input";
import citiesList from "@/lib/cities-list";
import { Button } from "./button";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city: any) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);
    return (
      <div>
        <Input
          type="search"
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          value={locationSearchInput}
          {...props}
          ref={ref}
          onChange={(e) => setLocationSearchInput(e.target.value)}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div>
            {!cities.length && <p className="p-3">No results found</p>}
            {cities?.map((c) => (
              <Button
                variant={"outline"}
                type="button"
                key={c}
                className="block w-full p-1 text-start"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(c);
                  setLocationSearchInput(c);
                  setHasFocus(false);
                }}
              >
                {c}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
