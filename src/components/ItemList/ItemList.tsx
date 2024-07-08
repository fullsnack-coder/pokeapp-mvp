import { Fragment, HTMLProps, useCallback } from "react";
import Icon from "../Icon";

export type Props<T = any> = {
  isLoading: boolean;
  items: T[];
  header?: JSX.Element;
  footer?: JSX.Element;
  renderItem?: (item: T) => JSX.Element;
  emptyState?: JSX.Element;
  loader?: JSX.Element;
  direction?: "row" | "column";
  wrapperProps?: Omit<HTMLProps<HTMLDivElement>, "className">;
};

function ItemList<T>({
  isLoading,
  footer,
  header,
  loader,
  renderItem,
  items,
  direction = "column",
  emptyState,
  wrapperProps = {},
}: Props<T>) {
  const handleRenderItem = useCallback(
    (item: (typeof items)[0], idx: number) => {
      if (renderItem) {
        return renderItem(item);
      }

      return <Fragment key={idx}>{`Item ${idx}`}</Fragment>;
    },
    [renderItem]
  );

  const isEmpty = items.length === 0;

  return (
    <section>
      {header || null}
      {isLoading ? (
        loader || (
          <div className="animate-spin w-fit mx-auto">
            <Icon name="loader" />
          </div>
        )
      ) : isEmpty ? (
        <>{emptyState || <div className="text-center">No items to show</div>}</>
      ) : (
        <div
          className={`flex gap-3 ${
            direction === "column" ? "flex-col" : "flex-row"
          }`}
          {...wrapperProps}
        >
          {items.map(handleRenderItem)}
        </div>
      )}
      {footer || null}
    </section>
  );
}

export default ItemList;
