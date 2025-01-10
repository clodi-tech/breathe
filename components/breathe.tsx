"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Breathe() {
  const [inhaleLength, setInhaleLength] = useState(4);
  const [inhalePause, setInhalePause] = useState(1);
  const [exhaleLength, setExhaleLength] = useState(4);
  const [exhalePause, setExhalePause] = useState(1);
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("Inhale");
  const [timeLeft, setTimeLeft] = useState(inhaleLength);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isBreathing) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            switch (currentPhase) {
              case "Inhale":
                setCurrentPhase("Inhale Pause");
                return inhalePause;
              case "Inhale Pause":
                setCurrentPhase("Exhale");
                return exhaleLength;
              case "Exhale":
                setCurrentPhase("Exhale Pause");
                return exhalePause;
              case "Exhale Pause":
                setCurrentPhase("Inhale");
                return inhaleLength;
              default:
                return 0;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [
    isBreathing,
    currentPhase,
    inhaleLength,
    inhalePause,
    exhaleLength,
    exhalePause,
  ]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      setCurrentPhase("Inhale");
      setTimeLeft(inhaleLength);
    }
    setIsBreathing(!isBreathing);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Breathing App</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="inhale-length">Inhale Length: {inhaleLength}s</Label>
          <Slider
            id="inhale-length"
            min={1}
            max={10}
            step={1}
            value={[inhaleLength]}
            onValueChange={(value) => setInhaleLength(value[0])}
            disabled={isBreathing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inhale-pause">Inhale Pause: {inhalePause}s</Label>
          <Slider
            id="inhale-pause"
            min={0}
            max={5}
            step={1}
            value={[inhalePause]}
            onValueChange={(value) => setInhalePause(value[0])}
            disabled={isBreathing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exhale-length">Exhale Length: {exhaleLength}s</Label>
          <Slider
            id="exhale-length"
            min={1}
            max={10}
            step={1}
            value={[exhaleLength]}
            onValueChange={(value) => setExhaleLength(value[0])}
            disabled={isBreathing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exhale-pause">Exhale Pause: {exhalePause}s</Label>
          <Slider
            id="exhale-pause"
            min={0}
            max={5}
            step={1}
            value={[exhalePause]}
            onValueChange={(value) => setExhalePause(value[0])}
            disabled={isBreathing}
          />
        </div>
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">{currentPhase}</div>
          <div className="text-4xl font-bold">{timeLeft}s</div>
          <Button onClick={toggleBreathing} className="w-full">
            {isBreathing ? "Stop" : "Start"} Breathing Exercise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
