"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full"
      {...props}
      type="submit"
      disabled={props.disabled || pending}
    >
      {pending && (
        <span>
          <Loader2 size={16} className="mr-2 animate-spin" />
        </span>
      )}
      {props.children}
    </Button>
  );
};
export default FormSubmitButton;
