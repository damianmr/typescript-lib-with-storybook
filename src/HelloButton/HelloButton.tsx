import React, { useState } from 'react';

type HelloButtonProps = {
  text: string;
  onClick: (clickedCount: number) => void;
  className?: string;
};

function addOne(n: number): number {
  return n + 1;
}

export const HelloButton = ({ text, onClick, className }: HelloButtonProps) => {
  const [count, setCount] = useState(0);
  return (
    <button
      className={className}
      onClick={() => {
        onClick(addOne(count));
        setCount(addOne(count));
      }}
    >
      {text}
    </button>
  );
};
