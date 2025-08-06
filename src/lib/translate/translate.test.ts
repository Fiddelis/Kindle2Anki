import { translate } from "@/lib/translate";
import { LookupWithWord } from "@/types/kindle";

describe("Translate Function Tests", () => {
  test("translateTexts should log translated texts", () => {
    const lookup: LookupWithWord = {
      lookup_id: "CR!PFYWC0PW3D6P3F159AGXJE2GRG0Y:AQEEAAAPAAAA:372:12",
      book_id: "CR!PFYWC0PW3D6P3F159AGXJE2GRG0Y",
      word_id: "en:landscape",
      usage:
        "Spring Boot and Quarkus Introduction In the current landscape of software development, choosing the right technology to build and maintain applications can be crucial. ",
      word: "landscape",
      stem: "landscape",
      word_lang: "en",
      word_timestamp: new Date(1748290144924),
      lookup_timestamp: new Date(1748290144940),

      word_translated: null,
      usage_translated: null,
    };

    translate([lookup], "pt").then((translatedTexts) => {
      expect(translatedTexts).toEqual([
        {
          ...lookup,
          word_translated: "paisagem",
          usage_translated:
            "Introdução ao Spring Boot e Quarkus No cenário atual de desenvolvimento de software, escolher a tecnologia certa para criar e manter aplicativos pode ser crucial.",
        },
      ]);
    });
  });
});
