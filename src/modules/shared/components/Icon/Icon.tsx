import paths from "@/modules/shared/utils/icons.json";
import SVGIcon from "../SVGIcon";

type Props = {
  name: keyof typeof paths;
  _baseSize?: number;
};

const Icon: React.FC<Props> = ({ name, _baseSize }) => {
  return <SVGIcon svgPaths={paths[name] || []} size={_baseSize} />;
};

export default Icon;
