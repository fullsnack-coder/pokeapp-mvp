import { useEffect, useRef } from "react";
import ItemList, { Props as ItemListProps } from "../ItemList";
import Icon from "../Icon";

type Props = {
  hasMore: boolean;
  loadMore: () => void;
  isLoadingContent: boolean;
  isLoadingMore: boolean;
  listProps: Partial<ItemListProps> &
    Pick<ItemListProps, "items" | "renderItem">;
};

const InfinitePaginatedList: React.FC<Props> = ({
  hasMore,
  loadMore,
  isLoadingContent,
  isLoadingMore,
  listProps,
}) => {
  const endOfContent = useRef<HTMLDivElement | null>(null);
  const hasMoreRef = useRef(hasMore);

  const observer = useRef<IntersectionObserver>(
    typeof window === "undefined"
      ? null
      : new IntersectionObserver(
          (entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && hasMoreRef.current) {
              loadMore();
            }
          },
          {
            threshold: 0.5,
          }
        )
  );

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) {
      if (!isLoadingContent)
        currentObserver.observe(endOfContent.current as Element);
      return () => {
        currentObserver.disconnect();
      };
    }
  }, [isLoadingContent]);

  return (
    <div>
      <ItemList
        isLoading={isLoadingContent}
        footer={
          <div ref={endOfContent} className="min-h-[8vh] py-4 w-full">
            {isLoadingMore ? (
              <span className="animate-spin block w-fit mx-auto">
                <Icon name="loader" />
              </span>
            ) : null}
          </div>
        }
        {...listProps}
      />
    </div>
  );
};

export default InfinitePaginatedList;
