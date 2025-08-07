import { useState } from 'react';
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
}: {
  title: string;
  front?: React.ReactNode;
  back?: React.ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-sm mx-auto [perspective:1000px]"
      role="region"
      aria-expanded={flipped}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-500
          [transform-style:preserve-3d]
          ${flipped ? '[transform:rotateY(180deg)]' : ''}
        `}
      >
        {/* Front face */}
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Front</CardDescription>
            <CardAction>
              <Button
                variant="link"
                onClick={() => setFlipped(true)}
                aria-label="Flip card to see back"
                className="cursor-pointer"
              >
                See back
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>{front}</CardContent>
        </Card>

        {/* Back face (rotated 180 deg) */}
        <Card className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Back</CardDescription>
            <CardAction>
              <Button
                variant="link"
                onClick={() => setFlipped(false)}
                aria-label="Flip card to see front"
                className="cursor-pointer"
              >
                See front
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>{back}</CardContent>
        </Card>
      </div>
    </div>
  );
}
