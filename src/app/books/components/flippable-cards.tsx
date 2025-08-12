import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FlippableCard({
  title,
  front,
  back,
  className,
}: {
  title: string;
  front?: React.ReactNode;
  back?: React.ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [front, back]);

  return (
    <div className={`relative w-full max-w-md ${className} [perspective:1000px]`}>
      <div
        className={`
          relative w-full h-full min-h-[300px]
          transition-transform duration-500
          [transform-style:preserve-3d]
          ${flipped ? '[transform:rotateY(180deg)]' : ''}
        `}
      >
        {/* Front face */}
        <Card
          className="absolute inset-0 backface-hidden h-full flex flex-col justify-between"
          onClick={() => setFlipped(true)}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Front</CardDescription>
            <CardAction>
              <Button variant="link" aria-label="Flip card to see back">
                See back
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center ">
            <div>{front}</div>
          </CardContent>
        </Card>

        {/* Back face */}
        <Card
          className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] h-full flex flex-col justify-between"
          onClick={() => setFlipped(false)}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Back</CardDescription>
            <CardAction>
              <Button variant="link" aria-label="Flip card to see front">
                See front
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <div>{back}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
