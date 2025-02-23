import { FC } from "react";

interface ButtomProps {
  isSuccess: boolean;
  titleSuccess?: string;
  errorMessage?: string;
  error?: boolean;
}

const MessageForm: FC<ButtomProps> = ({
  isSuccess,
  titleSuccess,
  errorMessage,
  error,
}) => {
  return (
    <>
      {isSuccess && (
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 text-sm">
            {titleSuccess ? titleSuccess : "¡Cambios guardados exitosamente!"}
          </p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-700 text-sm">
            Ha ocurrido un Error: <br /> {errorMessage && errorMessage}
          </p>
        </div>
      )}
    </>
  );
};

export default MessageForm;
