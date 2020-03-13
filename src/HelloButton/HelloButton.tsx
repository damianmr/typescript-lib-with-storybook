import React, { useState } from 'react';
import styled from 'styled-components';

type HelloButtonProps = {
  text: string;
  onClick: (clickedCount: number) => void;
  className?: string;
  isDisabled?: boolean;
};

function addOne(n: number): number {
  return n + 1;
}

const Button = styled.button<Partial<HelloButtonProps>>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid steelblue;
  color: steelblue;
  margin: 0;
  font-size: 13pt;
  padding: 10px 25px;
  cursor: pointer;
  ${(props: Partial<HelloButtonProps>) =>
    props.isDisabled &&
    `
      background: lightgray;
      border-color: gray;
      cursor: not-allowed;
      color: gray;
    `}
`;

export const HelloButton = ({ text, onClick, className, isDisabled }: HelloButtonProps) => {
  const [count, setCount] = useState(0);
  return (
    <Button
      className={className}
      isDisabled={isDisabled}
      onClick={() => {
        onClick(addOne(count));
        setCount(addOne(count));
      }}
    >
      {text}
    </Button>
  );
};
