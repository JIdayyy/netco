import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function CTAButton(props: ButtonProps) {
  return (
    <button {...props} className="text-white bg-orange-500 rounded-md px-2 py-1">
      {props.children}
    </button>
  );
}
