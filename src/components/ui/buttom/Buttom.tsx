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
}

const Buttom: FC<ButtomProps> = ({
  title,
  icon,
  className,
  isLoading,
  textLoading,
  to,
  type,
}) => {
  const [loading, setLoading] = useState(false);
  const [classNameSubmit, setclassNameSubmit] = useState("");
  const Icon = icon;

  const handdleClick = () => {
    setLoading(true);
    setclassNameSubmit("bg-slate-500");
    if (to) redirect(to);
  };

  return (
    <>
      {isLoading !== undefined && (
        <button disabled={isLoading} className={className} type={type}>
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
          disabled={loading}
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
