import { HTMLProps, memo, NamedExoticComponent } from "react";

type Props = {
  isActive: boolean;
  type: string;
  noSelected?: boolean;
  _buttonProps?: Omit<HTMLProps<HTMLButtonElement>, "type">;
};

const ActivableChip: NamedExoticComponent<Props> = memo(
  ({ isActive, type, noSelected, _buttonProps = {} }) => (
    <button
      key={type}
      className={`p-2 border rounded-full min-w-[140px] hover:scale-105 transition-transform ${
        noSelected ? "opacity-45" : ""
      } ${isActive ? "bg-black text-white" : "bg-white text-black"}`}
      {..._buttonProps}
    >
      {type}
    </button>
  ),
  (prevProps, nextProps) =>
    prevProps.isActive === nextProps.isActive &&
    prevProps.noSelected === nextProps.noSelected
);

ActivableChip.displayName = "ActivableChip";

export default ActivableChip;
