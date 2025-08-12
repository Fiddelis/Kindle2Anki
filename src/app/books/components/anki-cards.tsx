'use client';

import { FlippableCard } from './flippable-cards';
import { useEffect, useState } from 'react';
import { RadioGroupSettings } from './radio-group-settings';
import { Button } from '@/components/ui/button';
import { FileDownIcon } from 'lucide-react';
import { AnkiCard, LookupWithWord } from '@/types/kindle';

const cardBasicOnlyWords = {
  title: 'Basic (Only Words)',
  front: <>Word</>,
  back: <>Word translation</>,
};

const cardBasicWithSentenceTranslated = {
  title: 'Basic (With Sentence Translated)',
  front: (
    <>
      Because of the sensitivities of the <mark>subject matter</mark>, many of those interviewed for
      this book agreed to speak only on the condition that they not be identified.
    </>
  ),
  back: (
    <>
      Literal translation: <mark>assunto</mark>
      <br />
      <br />
      Devido à sensibilidade do assunto, muitos dos entrevistados para este livro concordaram em
      falar apenas sob a condição de não serem identificados.
    </>
  ),
};

const cardClozeDeletion = {
  title: 'Cloze Deletion',
  front: (
    <>
      Lorem ipsum dolor sit amet <mark>[...]</mark> adipisicing elit. Ipsam, amet? Cumque molestiae
      quam ipsa vitae exercitationem, quia.
    </>
  ),
  back: (
    <>
      Lorem ipsum dolor sit amet <mark>consectetur</mark> adipisicing elit. Ipsam, amet? Cumque
      molestiae quam ipsa vitae exercitationem, quia.
    </>
  ),
};

type Props = {
  selectedFormat: string;
  onSelectedFormatChange: (format: string) => void;
  onGenerateCards: () => void;
  cardTypes: {
    label: string;
    value: string;
  }[];
};

export default function ExampleCards(props: Props) {
  const [cardType, setCardType] = useState(cardBasicOnlyWords);

  useEffect(() => {
    switch (props.selectedFormat) {
      case 'basicOnlyWords':
        setCardType(cardBasicOnlyWords);
        break;
      case 'basicWithSentenceTranslated':
        setCardType(cardBasicWithSentenceTranslated);
        break;
      case 'clozeDeletion':
        setCardType(cardClozeDeletion);
        break;
      default:
        setCardType(cardBasicOnlyWords);
    }
  }, [props.selectedFormat]);

  return (
    <div className="h-[400px]">
      <h1 className="text-4xl text-center font-bold tracking-tight">Anki Cards</h1>

      <div className="flex flex-col xl:flex-row items-center justify-between gap-10 py-10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col gap-6 w-full max-w-sm">
          <b className="text-center xl:text-start">Card Type</b>
          <RadioGroupSettings
            options={props.cardTypes}
            setItem={props.onSelectedFormatChange}
            className="gap-2 w-full"
          />

          <Button
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              props.onGenerateCards();
            }}
          >
            <FileDownIcon />
            Generate Cards
          </Button>
        </div>

        <div className="flex items-center justify-center w-full ">
          <FlippableCard
            title={cardType.title}
            front={cardType.front}
            back={cardType.back}
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
