import React from "react";

import { CloseIcon } from "./icons/CloseIcon";
import { CustomButton } from "./styled";

interface IButtonProps {
  text?: string;
  close?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: IButtonProps) => {
  const { text, close, disabled, className, onClick } = props;

  return (
    <CustomButton
      disabled={disabled}
      onClick={onClick}
      $close={close}
      className={className}
    >
      {close ? <CloseIcon /> : text}
    </CustomButton>
  );
};

export default Button;
