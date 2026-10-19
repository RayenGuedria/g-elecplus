import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  placeholder?: string;
  required?: boolean;
}

type CSC = typeof import("country-state-city");
type CountryItem = { isoCode: string; name: string; flag: string };

export const CitySelect = ({ name, placeholder = "Ville", required }: Props) => {
  const [countryIso, setCountryIso] = useState<string>("FR");
  const [countryName, setCountryName] = useState<string>("France");
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState("");
  const [manual, setManual] = useState(false);

  // Heavy worldwide dataset (~6 MB) is split into its own async chunk and
  // fetched only when the user first opens a picker — so visitors who never
  // touch the contact form never download it.
  const [csc, setCsc] = useState<CSC | null>(null);
  const [allCountries, setAllCountries] = useState<CountryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const ensureLoaded = () => {
    if (csc || loading) return;
    setLoading(true);
    import("country-state-city").then((m) => {
      setCsc(m);
      setAllCountries(
        m.Country.getAllCountries().slice().sort((a, b) => a.name.localeCompare(b.name))
      );
    });
  };

  const cities = useMemo(() => {
    if (!csc) return [];
    const list = csc.City.getCitiesOfCountry(countryIso) || [];
    // unique names, alphabetical
    const seen = new Set<string>();
    const out: string[] = [];
    for (const c of list) {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        out.push(c.name);
      }
    }
    return out.sort((a, b) => a.localeCompare(b));
  }, [csc, countryIso]);

  const submitValue = city ? `${countryName}, ${city}` : "";

  return (
    <div className="grid grid-cols-2 gap-2">
      <input type="hidden" name={name} value={submitValue} required={required} />

      {/* Country picker */}
      <Popover open={countryOpen} onOpenChange={(o) => { if (o) ensureLoaded(); setCountryOpen(o); }}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between h-12 bg-background/50 border-white/10 font-normal"
          >
            <span className="truncate">{countryName}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[260px] p-0 bg-popover" align="start">
          <Command>
            <CommandInput placeholder="Pays..." />
            <CommandList>
              <CommandEmpty>{loading && !csc ? "Chargement…" : "Aucun pays."}</CommandEmpty>
              <CommandGroup>
                {allCountries.map((c) => (
                  <CommandItem
                    key={c.isoCode}
                    value={c.name}
                    onSelect={() => {
                      setCountryIso(c.isoCode);
                      setCountryName(c.name);
                      setCity("");
                      setManual(false);
                      setCountryOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", countryIso === c.isoCode ? "opacity-100" : "opacity-0")} />
                    <span className="mr-2">{c.flag}</span>
                    {c.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* City picker / manual */}
      {manual ? (
        <div className="flex gap-1">
          <Input
            placeholder="Votre ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required={required}
            autoFocus
            className="bg-background/50 border-white/10 h-12 flex-1"
          />
          <Button type="button" variant="outline" className="h-12 px-2" onClick={() => { setManual(false); setCity(""); }}>
            Liste
          </Button>
        </div>
      ) : (
        <Popover open={cityOpen} onOpenChange={(o) => { if (o) ensureLoaded(); setCityOpen(o); }}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between h-12 bg-background/50 border-white/10 font-normal",
                !city && "text-muted-foreground"
              )}
            >
              <span className="truncate">{city || placeholder}</span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[260px] p-0 bg-popover" align="start">
            <Command>
              <CommandInput placeholder="Rechercher une ville..." />
              <CommandList>
                <CommandEmpty>
                  {loading && !csc ? (
                    <div className="text-sm py-2 text-muted-foreground text-center">Chargement des villes…</div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setManual(true); setCityOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 text-sm py-2 text-accent hover:underline"
                    >
                      <Pencil className="w-4 h-4" /> Autre — saisir manuellement
                    </button>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {cities.slice(0, 500).map((cityName) => (
                    <CommandItem
                      key={cityName}
                      value={cityName}
                      onSelect={() => { setCity(cityName); setCityOpen(false); }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", city === cityName ? "opacity-100" : "opacity-0")} />
                      {cityName}
                    </CommandItem>
                  ))}
                  <CommandItem
                    value="__autre__"
                    onSelect={() => { setManual(true); setCityOpen(false); }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Autre — saisir manuellement
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};