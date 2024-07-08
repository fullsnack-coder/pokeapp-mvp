type Props = {
  svgPaths: Array<string>;
  size?: number;
};

export const DEFAULT_ICON_SIZE = 24;

const SVGIcon: React.FC<Props> = ({ svgPaths, size = DEFAULT_ICON_SIZE }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {svgPaths.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
};

export default SVGIcon;
