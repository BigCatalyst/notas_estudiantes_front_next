/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/navigation";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { TbLoader2 } from "react-icons/tb";

interface ButtomProps {
  title?: string;
  icon?: IconType;
  textLoading?: string;
  className?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  to?: string;
  onClick?: (value: any) => void;
  disable?: boolean;
}

const Buttom: FC<ButtomProps> = ({
  title,
  icon,
  className,
  isLoading,
  textLoading,
  to,
  type,
  onClick,
  disable,
}) => {
  const [loading, setLoading] = useState(false);
  const [classNameSubmit, setclassNameSubmit] = useState("");
  const Icon = icon;

  const handdleClick = (e: any) => {
    setLoading(true);
    setclassNameSubmit("bg-slate-500");
    if (to) redirect(to);
    if (onClick) onClick(e);
  };

  return (
    <>
      {isLoading !== undefined && (
        <button
          disabled={isLoading || disable}
          className={className}
          type={type}
          onClick={onClick}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <TbLoader2 className="animate-spin mr-2 h-5 w-5" />
              {!textLoading ? title : textLoading}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5" />} {title}
            </span>
          )}
        </button>
      )}
      {isLoading === undefined && (
        <button
          disabled={loading || disable}
          className={className}
          onClick={handdleClick}
          style={{ backgroundColor: `${classNameSubmit && "#62748e"}` }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <TbLoader2 className="animate-spin mr-2 h-5 w-5" />
              {!textLoading ? title : textLoading}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5" />} {title}
            </span>
          )}
        </button>
      )}
    </>
    // <button
    //   type={type}
    //   disabled={type !== "submit" && (isLoading || loading)}
    //   className={className}
    //   onClick={handdleClick}
    //   style={{ backgroundColor: `${classNameSubmit && "#62748e"}` }}
    // >
    //   {isLoading || loading ? (
    //     <span className="flex items-center justify-center">
    //       <TbLoader2 className="animate-spin mr-2 h-5 w-5" />
    //       {!textLoading ? title : textLoading}
    //     </span>
    //   ) : (
    //     <span className="inline-flex items-center gap-2">
    //       {Icon && <Icon className="h-5 w-5" />} {title}
    //     </span>
    //   )}
    // </button>
  );
};

export default Buttom;
