import React, { useState } from "react";

interface Item {
  id: string;
  name: string;
}

interface AutoCompleteProps {
  items: Item[];
  placeholder?: string;
  onSelect: (item: Item) => void;
  className?: string;
  selecteItem?: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  items,
  placeholder,
  onSelect,
  className,
  selecteItem,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Filtrar la lista según el valor del input
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Manejar cambios en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Manejar selección de un elemento
  const handleItemClick = (item: Item) => {
    setInputValue(item.name); // Actualizar el input con el nombre seleccionado
    onSelect(item); // Notificar al padre sobre la selección
    setIsFocused(false); // Cerrar el dropdown
  };

  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        type="text"
        defaultValue={selecteItem}
        //value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Retraso para permitir clics en el dropdown
        placeholder={placeholder || "Buscar..."}
        className={className}
      />

      {/* Dropdown */}
      {isFocused && filteredItems.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
