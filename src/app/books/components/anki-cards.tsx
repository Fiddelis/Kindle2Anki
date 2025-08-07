'use client';

import { FlippableCard } from './flippable-cards';
import { useEffect, useState } from 'react';
import { RadioGroupSettings } from './radio-group-settings';
import { Button } from '@/components/ui/button';
import { FileDownIcon } from 'lucide-react';

const cardType = [
  {
    label: 'Basic (Only Words)',
    value: 'basicOnlyWords',
  },
  {
    label: 'Basic (With Sentence Translated)',
    value: 'basicWithSentenceTranslated',
  },
  {
    label: 'Cloze Deletion',
    value: 'clozeDeletion',
  },
];

const cardBasicOnlyWords = {
  title: 'Basic (Only Words)',
  front: <>Word</>,
  back: <>Word translation</>,
};

const cardBasicWithSentenceTranslated = {
  title: 'Basic (With Sentence Translated)',
  front: (
    <>
      Because of the sensitivities of the <b className="bg-green-800">subject matter</b>, many of
      those interviewed for this book agreed to speak only on the condition that they not be
      identified.
    </>
  ),
  back: (
    <>
      Devido à sensibilidade do assunto, muitos dos entrevistados para este livro concordaram em
      falar apenas sob a condição de não serem identificados.
    </>
  ),
};

const cardClozeDeletion = {
  title: 'Cloze Deletion',
  front: (
    <>
      Lorem ipsum dolor sit amet <b className="bg-green-800">[...]</b> adipisicing elit. Ipsam,
      amet? Cumque molestiae quam ipsa vitae exercitationem, quia.
    </>
  ),
  back: (
    <>
      Lorem ipsum dolor sit amet <b className="bg-green-800">consectetur</b> adipisicing elit.
      Ipsam, amet? Cumque molestiae quam ipsa vitae exercitationem, quia.
    </>
  ),
};

export default function AnkiCards() {
  const [selectedFormat, setSelectedFormat] = useState('basicOnlyWords');
  const [cardData, setCardData] = useState(cardBasicOnlyWords);

  useEffect(() => {
    switch (selectedFormat) {
      case 'basicOnlyWords':
        setCardData(cardBasicOnlyWords);
        break;
      case 'basicWithSentenceTranslated':
        setCardData(cardBasicWithSentenceTranslated);
        break;
      case 'clozeDeletion':
        setCardData(cardClozeDeletion);
        break;
      default:
        setCardData(cardBasicOnlyWords);
    }
  }, [selectedFormat]);

  return (
    <>
      <h1 className="text-4xl text-center">Anki Cards</h1>

      <div className="flex flex-col xl:flex-row items-center justify-between gap-10 py-10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col gap-6 w-full max-w-sm">
          <b className="text-gray-400 text-center xl:text-start">Card Type</b>
          <RadioGroupSettings
            options={cardType}
            setItem={setSelectedFormat}
            className="gap-2 w-full"
          />

          <Button className="flex gap-2 cursor-pointer">
            <FileDownIcon />
            Generate Cards
          </Button>
        </div>

        <div className="flex items-center justify-center w-full h-full ">
          <FlippableCard
            title={cardData.title}
            front={cardData.front}
            back={cardData.back}
            className="min-h-[300px] w-full max-w-md"
          />
        </div>
      </div>
    </>
  );
}
