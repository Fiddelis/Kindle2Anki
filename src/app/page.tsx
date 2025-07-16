"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      setFile(file);
    }
  }

  function handleConfirm() {
    if (!file) return;

    const blobUrl = URL.createObjectURL(file);
    router.push(`/books?fileUrl=${encodeURIComponent(blobUrl)}`);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <h1>TESTE</h1>

        <input
          ref={inputRef}
          type="file"
          accept=".db"
          className="hidden"
          onChange={handleChange}
        />

        <Card
          onClick={handleClick}
          className="cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center justify-center w-96"
        >
          <CardContent>
            Click here or drag your <b>vocab.db</b> file
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="cursor-pointer">
              {file
                ? file.name + " (" + file.size / 1000 + " KB)"
                : "Select file"}
            </Button>
          </CardFooter>
        </Card>

        <Button
          className="cursor-pointer"
          disabled={!file}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </>
  );
}
