import { Link } from "react-router-dom";
import useFullMovie from "../../hooks/fullMovieHook";
import { getImageUrl } from "../../api/moviesApi";
import { CrewMember } from "../../interfaces/Credit";
import CreditListItem from "@/Components/CreditListItem";
import LoadingScreen from "@/Components/LoadingScreen";

const SectionTitle = ({ title, length }: { title: string; length: number }) => (
  <h2 className="flex items-center gap-2 text-2xl font-bold text-amber-400">
    {title}
    <span className="text-xl font-light text-neutral-400">{length || 0}</span>
  </h2>
);

const CastPage = () => {
  const { numId: id, movie, loading } = useFullMovie();

  if (loading) return <LoadingScreen />;
  if (id === -1 || !movie) throw new Error(`No movie found: ${id}`);

  const departments: { [key: string]: [CrewMember] } = {};

  if (movie.credits?.crew && movie.credits.crew.length > 0) {
    movie.credits.crew.forEach((crew: CrewMember) => {
      const { department } = crew;

      if (departments[department]) {
        departments[department].push(crew);
      } else {
        departments[department] = [crew];
      }
    });
  }

  return (
    <div className="wrapper">
      <Link to={`/movie/${id}`} className="flex items-center gap-6">
        <img
          src={getImageUrl(movie.images.poster, 154)}
          alt={movie.title}
          className="w-32 rounded-lg"
        />
        <h1 className="text-2xl font-bold text-neutral-200">
          {movie.title}{" "}
          <span className="font-normal text-neutral-300">
            ({movie.releaseDate.split("-")[0]})
          </span>
        </h1>
      </Link>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <section>
            <SectionTitle
              title="Cast"
              length={movie.credits.cast.length || 0}
            />
            <ul className="mt-6 flex flex-col gap-6">
              {movie.credits?.cast.map((member) => (
                <CreditListItem member={member} />
              ))}
            </ul>
          </section>
        )}
        {Object.keys(departments).length > 0 && (
          <section>
            <SectionTitle
              title="Crew"
              length={movie.credits!.crew.length || 0}
            />
            {Object.keys(departments).map((department) => {
              const list = departments[department];

              return (
                <section className="mt-6">
                  <h3 className="text-xl font-medium text-neutral-200">
                    {department}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-6">
                    {list.map((member) => (
                      <CreditListItem member={member} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default CastPage;
