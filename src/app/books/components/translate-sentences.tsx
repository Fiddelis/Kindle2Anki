'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LookupWithWord } from '@/types/kindle';

const languages = [
  { label: 'Abkhaz', value: 'ab' },
  { label: 'Achinese', value: 'ace' },
  { label: 'Acholi', value: 'ach' },
  { label: 'Afrikaans', value: 'af' },
  { label: 'Albanian', value: 'sq' },
  { label: 'Alur', value: 'alz' },
  { label: 'Amharic', value: 'am' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Armenian', value: 'hy' },
  { label: 'Assamese', value: 'as' },
  { label: 'Awadhi', value: 'awa' },
  { label: 'Aymara', value: 'ay' },
  { label: 'Azerbaijani', value: 'az' },
  { label: 'Balinese', value: 'ban' },
  { label: 'Bambara', value: 'bm' },
  { label: 'Bashkir', value: 'ba' },
  { label: 'Basque', value: 'eu' },
  { label: 'Batak Karo', value: 'btx' },
  { label: 'Batak Simalungun', value: 'bts' },
  { label: 'Batak Toba', value: 'bbc' },
  { label: 'Belarusian', value: 'be' },
  { label: 'Bemba', value: 'bem' },
  { label: 'Bengali', value: 'bn' },
  { label: 'Betawi', value: 'bew' },
  { label: 'Bhojpuri', value: 'bho' },
  { label: 'Bikol', value: 'bik' },
  { label: 'Bosnian', value: 'bs' },
  { label: 'Breton', value: 'br' },
  { label: 'Bulgarian', value: 'bg' },
  { label: 'Buryat', value: 'bua' },
  { label: 'Cantonese', value: 'yue' },
  { label: 'Catalan', value: 'ca' },
  { label: 'Cebuano', value: 'ceb' },
  { label: 'Chichewa (Nyanja)', value: 'ny' },
  { label: 'Chinese (Simplified)', value: 'zh-CN' },
  { label: 'Chinese (Traditional)', value: 'zh-TW' },
  { label: 'Chuvash', value: 'cv' },
  { label: 'Corsican', value: 'co' },
  { label: 'Crimean Tatar', value: 'crh' },
  { label: 'Croatian', value: 'hr' },
  { label: 'Czech', value: 'cs' },
  { label: 'Danish', value: 'da' },
  { label: 'Dinka', value: 'din' },
  { label: 'Divehi', value: 'dv' },
  { label: 'Dogri', value: 'doi' },
  { label: 'Dombe', value: 'dov' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Dzongkha', value: 'dz' },
  { label: 'English', value: 'en' },
  { label: 'Esperanto', value: 'eo' },
  { label: 'Estonian', value: 'et' },
  { label: 'Ewe', value: 'ee' },
  { label: 'Fijian', value: 'fj' },
  { label: 'Filipino (Tagalog)', value: 'fil' },
  { label: 'Finnish', value: 'fi' },
  { label: 'French', value: 'fr' },
  { label: 'French (France)', value: 'fr-FR' },
  { label: 'French (Canada)', value: 'fr-CA' },
  { label: 'Frisian', value: 'fy' },
  { label: 'Fulah', value: 'ff' },
  { label: 'Ga', value: 'gaa' },
  { label: 'Galician', value: 'gl' },
  { label: 'Ganda (Luganda)', value: 'lg' },
  { label: 'Georgian', value: 'ka' },
  { label: 'German', value: 'de' },
  { label: 'Greek', value: 'el' },
  { label: 'Guarani', value: 'gn' },
  { label: 'Gujarati', value: 'gu' },
  { label: 'Haitian Creole', value: 'ht' },
  { label: 'Hakha Chin', value: 'cnh' },
  { label: 'Hausa', value: 'ha' },
  { label: 'Hawaiian', value: 'haw' },
  { label: 'Hebrew', value: 'he' },
  { label: 'Hiligaynon', value: 'hil' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Hmong', value: 'hmn' },
  { label: 'Hungarian', value: 'hu' },
  { label: 'Hunsrik', value: 'hrx' },
  { label: 'Icelandic', value: 'is' },
  { label: 'Igbo', value: 'ig' },
  { label: 'Iloko', value: 'ilo' },
  { label: 'Indonesian', value: 'id' },
  { label: 'Irish', value: 'ga' },
  { label: 'Italian', value: 'it' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Javanese', value: 'jv' },
  { label: 'Kannada', value: 'kn' },
  { label: 'Kapampangan', value: 'pam' },
  { label: 'Kazakh', value: 'kk' },
  { label: 'Khmer', value: 'km' },
  { label: 'Kiga', value: 'cgg' },
  { label: 'Kinyarwanda', value: 'rw' },
  { label: 'Kituba', value: 'ktu' },
  { label: 'Konkani', value: 'gom' },
  { label: 'Korean', value: 'ko' },
  { label: 'Krio', value: 'kri' },
  { label: 'Kurdish (Kurmanji)', value: 'ku' },
  { label: 'Kurdish (Sorani)', value: 'ckb' },
  { label: 'Kyrgyz', value: 'ky' },
  { label: 'Lao', value: 'lo' },
  { label: 'Latgalian', value: 'ltg' },
  { label: 'Latin', value: 'la' },
  { label: 'Latvian', value: 'lv' },
  { label: 'Ligurian', value: 'lij' },
  { label: 'Limburgish', value: 'li' },
  { label: 'Lingala', value: 'ln' },
  { label: 'Lithuanian', value: 'lt' },
  { label: 'Lombard', value: 'lmo' },
  { label: 'Luo', value: 'luo' },
  { label: 'Luxembourgish', value: 'lb' },
  { label: 'Macedonian', value: 'mk' },
  { label: 'Maithili', value: 'mai' },
  { label: 'Makassar', value: 'mak' },
  { label: 'Malagasy', value: 'mg' },
  { label: 'Malay', value: 'ms' },
  { label: 'Malay (Jawi)', value: 'ms-Arab' },
  { label: 'Malayalam', value: 'ml' },
  { label: 'Maltese', value: 'mt' },
  { label: 'Maori', value: 'mi' },
  { label: 'Marathi', value: 'mr' },
  { label: 'Eastern Mari', value: 'chm' },
  { label: 'Meitei (Manipuri)', value: 'mni-Mtei' },
  { label: 'Minangkabau', value: 'min' },
  { label: 'Mizo', value: 'lus' },
  { label: 'Mongolian', value: 'mn' },
  { label: 'Burmese', value: 'my' },
  { label: 'Southern Ndebele', value: 'nr' },
  { label: 'Newar', value: 'new' },
  { label: 'Nepali', value: 'ne' },
  { label: 'Northern Sotho (Sepedi)', value: 'nso' },
  { label: 'Norwegian', value: 'no' },
  { label: 'Nuer', value: 'nus' },
  { label: 'Occitan', value: 'oc' },
  { label: 'Odia', value: 'or' },
  { label: 'Oromo', value: 'om' },
  { label: 'Pangasinan', value: 'pag' },
  { label: 'Papiamento', value: 'pap' },
  { label: 'Pashto', value: 'ps' },
  { label: 'Persian', value: 'fa' },
  { label: 'Polish', value: 'pl' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Portuguese (Portugal)', value: 'pt-PT' },
  { label: 'Portuguese (Brazil)', value: 'pt-BR' },
  { label: 'Punjabi', value: 'pa' },
  { label: 'Punjabi (Shahmukhi)', value: 'pa-Arab' },
  { label: 'Quechua', value: 'qu' },
  { label: 'Romani', value: 'rom' },
  { label: 'Romanian', value: 'ro' },
  { label: 'Rundi', value: 'rn' },
  { label: 'Russian', value: 'ru' },
  { label: 'Samoan', value: 'sm' },
  { label: 'Sango', value: 'sg' },
  { label: 'Sanskrit', value: 'sa' },
  { label: 'Scottish Gaelic', value: 'gd' },
  { label: 'Serbian', value: 'sr' },
  { label: 'Sesotho', value: 'st' },
  { label: 'Seychellois Creole', value: 'crs' },
  { label: 'Shan', value: 'shn' },
  { label: 'Shona', value: 'sn' },
  { label: 'Sicilian', value: 'scn' },
  { label: 'Silesian', value: 'szl' },
  { label: 'Sindhi', value: 'sd' },
  { label: 'Sinhala', value: 'si' },
  { label: 'Slovak', value: 'sk' },
  { label: 'Slovene', value: 'sl' },
  { label: 'Somali', value: 'so' },
  { label: 'Spanish', value: 'es' },
  { label: 'Sundanese', value: 'su' },
  { label: 'Swahili', value: 'sw' },
  { label: 'Swati', value: 'ss' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Tajik', value: 'tg' },
  { label: 'Tamil', value: 'ta' },
  { label: 'Tatar', value: 'tt' },
  { label: 'Telugu', value: 'te' },
  { label: 'Tetum', value: 'tet' },
  { label: 'Thai', value: 'th' },
  { label: 'Tigrinya', value: 'ti' },
  { label: 'Tsonga', value: 'ts' },
  { label: 'Tswana', value: 'tn' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Turkmen', value: 'tk' },
  { label: 'Twi (Akan)', value: 'ak' },
  { label: 'Ukrainian', value: 'uk' },
  { label: 'Urdu', value: 'ur' },
  { label: 'Uyghur', value: 'ug' },
  { label: 'Uzbek', value: 'uz' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Welsh', value: 'cy' },
  { label: 'Xhosa', value: 'xh' },
  { label: 'Yiddish', value: 'yi' },
  { label: 'Yoruba', value: 'yo' },
  { label: 'Yucatec Maya', value: 'yua' },
  { label: 'Zulu', value: 'zu' },
] as const;

async function handleTranslate(
  lookups: LookupWithWord[],
  toLanguage: string,
  onLookupsChange: (lookups: LookupWithWord[]) => void,
) {
  if (!lookups.length) return;
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lookups, toLanguage }),
  });

  if (!res.ok) {
    console.error('Translation failed');
    return;
  }

  const translatedLookups = (await res.json()) as LookupWithWord[];
  onLookupsChange(translatedLookups);
}

const FormSchema = z.object({
  language: z.string().min(1, { message: 'Please select a language.' }),
});

interface Props {
  lookups: LookupWithWord[];
  onLookupsChange: (lookups: LookupWithWord[]) => void;
}

export default function TranslateSentences({ lookups, onLookupsChange }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleTranslate(lookups, data.language, onLookupsChange);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
          <Button className="cursor-pointer w-30" type="submit">
            Translate
          </Button>
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between cursor-pointer',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? languages.find((language) => language.value === field.value)?.label
                          : 'Select language'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search" className="h-9" />
                      <CommandList>
                        <CommandEmpty>No Language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              className="cursor-pointer"
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue('language', language.value);
                                setOpen(false);
                              }}
                            >
                              {language.label}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  language.value === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
