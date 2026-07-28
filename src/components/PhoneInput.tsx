import { useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/countries";
import { AsYouType, isValidPhoneNumber, getExampleNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";

interface Props {
  name: string;
  required?: boolean;
  placeholder?: string;
}

export const PhoneInput = ({ name, required, placeholder = "Numéro de téléphone" }: Props) => {
  const [open, setOpen] = useState(false);
  const [dial, setDial] = useState("+33");
  const [flag, setFlag] = useState("🇫🇷");
  const [iso, setIso] = useState<string>("FR");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const exampleObj = (() => {
    try { return getExampleNumber(iso as any, examples as any); } catch { return undefined; }
  })();
  const example = exampleObj ? exampleObj.formatNational() : placeholder;

  const formatDigits = (digits: string) => {
    return new AsYouType(iso as any).input(digits);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formatted = formatDigits(digits);
    setValue(formatted);
    const el = inputRef.current;
    if (el) {
      const valid = isValidPhoneNumber(formatted, iso as any);
      el.setCustomValidity(valid || formatted.length === 0 ? "" : "Numéro de téléphone invalide pour le pays sélectionné");
    }
  };

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      e.currentTarget.setCustomValidity("Veuillez renseigner votre numéro de téléphone");
    }
  };

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="h-12 bg-background/50 border-white/10 px-3 shrink-0 font-normal"
          >
            <span className="mr-1 text-base leading-none">{flag}</span>
            <span>{dial}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-popover" align="start">
          <Command>
            <CommandInput placeholder="Rechercher un pays..." />
            <CommandList>
              <CommandEmpty>Aucun résultat.</CommandEmpty>
              <CommandGroup>
                {countries.map((c) => (
                  <CommandItem
                    key={c.code}
                    value={`${c.name} ${c.dial}`}
                    onSelect={() => {
                      setDial(c.dial);
                      setFlag(c.flag);
                      setIso(c.code);
                      // Reformat current digits under new country, respecting new max
                      const digits = value.replace(/\D/g, "");
                      setValue(new AsYouType(c.code as any).input(digits));
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", dial === c.dial ? "opacity-100" : "opacity-0")} />
                    <span className="mr-2">{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="text-muted-foreground text-xs">{c.dial}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input type="hidden" name={`${name}_dial`} value={dial} />
      <input type="hidden" name={`${name}_country`} value={iso} />
      <Input
        ref={inputRef}
        type="tel"
        name={name}
        required={required}
        placeholder={example}
        value={value}
        onChange={handleChange}
        onInvalid={handleInvalid}
        inputMode="tel"
        autoComplete="tel"
        className="bg-background/50 border-white/10 h-12 flex-1"
      />
    </div>
  );
};