import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterText = ({
  phrases,
  typingSpeed = 100,
  pauseDuration = 2000,
}: TypewriterTextProps) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (isTyping) {
      if (charIndex < phrases[phraseIndex].length) {
        const timer = setTimeout(() => {
          setText(prev => prev + phrases[phraseIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
          setText('');
          setCharIndex(0);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, pauseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsTyping(true);
    }
  }, [charIndex, isTyping, phraseIndex, phrases, typingSpeed, pauseDuration]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};