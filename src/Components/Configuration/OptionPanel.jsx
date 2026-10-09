import PaintPicker from "./PaintPicker";
import OptionList from "./OptionList";

function OptionPanel({ category, selectedId, onSelect }) {
  return (
    <div>
      <p className="mb-4 text-[10px] uppercase tracking-[4px] text-yellow-400">
        {category.label}
      </p>

      {category.id === "paint" ? (
        <PaintPicker
          options={category.options}
          selectedId={selectedId}
          onSelect={(id) => onSelect(category.id, id)}
        />
      ) : (
        <OptionList
          catId={category.id}
          options={category.options}
          selectedId={selectedId}
          onSelect={(id) => onSelect(category.id, id)}
        />
      )}
    </div>
  );
}

export default OptionPanel;