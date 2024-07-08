import Icon from "@/modules/shared/components/Icon";
import Link from "next/link";

type Props = {
  name: string;
  sprite: string;
  types: Array<string>;
};

const SearchResult: React.FC<Props> = ({ name, sprite, types }) => {
  return (
    <article className="flex gap-4 justify-between items-center p-4 border rounded-lg border-gray-900 w-fit min-w-[300px] md:min-w-[450px] mx-auto">
      <picture className="flex-1">
        <img
          src={sprite}
          alt={name}
          className="w-full h-[120px] object-contain"
        />
      </picture>
      <main className="flex flex-col gap-3 flex-1">
        <p>
          <span className="font-bold">Pokémon name: </span>
          {name}
        </p>
        <p>
          <span className="font-bold">Types: </span>
          {types.join(",")}
        </p>
        <Link
          href={`/pokemons/${name}`}
          className="bg-[#0089ff] text-white px-5 py-2 rounded-lg flex gap-2 justify-between hover:bg-black transition-all ease-out duration-300"
        >
          View details
          <Icon name="chevron-right" />
        </Link>
      </main>
    </article>
  );
};

export default SearchResult;
