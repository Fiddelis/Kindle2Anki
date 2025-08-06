"use client";

import { FlippableCard } from "./flippable-cards";

export default function AnkiCards(props: { className?: string }) {
  console.log("FlippableCard:", FlippableCard);
  return (
    <div className={props.className}>
      <h1 className="text-4xl text-center">Anki Cards</h1>
      <div className="flex gap-8 justify-center my-8 ">
        <FlippableCard
          title={"Basic (With Sentence)"}
          front={
            <>
              Because of the sensitivities of the{" "}
              <b className="bg-green-700">subject matter</b>, many of those
              interviewed for this book agreed to speak only on the condition
              that they not be identified.
            </>
          }
          back={
            <>
              Devido à sensibilidade do assunto, muitos dos entrevistados para
              este livro concordaram em falar apenas sob a condição de não serem
              identificados.
            </>
          }
        />

        <FlippableCard
          title={"Basic (Only Word translated)"}
          front={"clever"}
          back={"esperto"}
        />

        <FlippableCard
          title={"Cloze (With Sentence)"}
          front={
            <p>
              It started in <b>[...]</b> predigital
            </p>
          }
          back={
            <p>
              It started in <b>the</b> predigital
            </p>
          }
        />
      </div>
    </div>
  );
}
