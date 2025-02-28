import { FC, useCallback, useEffect, useState } from "react";

import "./Home.scss";
import Refresh from "../../assets/icons/Refresh.svg?react";
import Team from "../../assets/icons/team.svg?react";
import Alert from "../../assets/icons/alert-triangle.svg?react";
import { Match, Root } from "../../Interfaces/Fronttemp";

interface HomeProps {
  name?: string;
}

export const Home: FC<HomeProps> = () => {
  const [error, setError] = useState(false);
  const [matches, setMatches] = useState<null | Match[]>(null);
  const [loading, setLoading] = useState(false);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      const abortController = new AbortController();
      const response = await fetch("https://app.ftoyd.com/fronttemp-service/fronttemp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      });
      const data: Root = await response.json();
      setMatches(data.data.matches);

      if (error) {
        setError(false);
      }

      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [error]);

  const updateData = () => {
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <section className={`home`}>
      <div className="home__head">
        <div className="home__title">Match Tracker</div>

        <div className="home__btn-area">
          {error && (
            <div className="home__err">
              <Alert /> Ошибка: не удалось загрузить информацию
            </div>
          )}
          <button disabled={loading} className="home__btn" onClick={updateData}>
            Обновить <Refresh />
          </button>
        </div>
      </div>
      <div className="home__content">
        {matches?.map((match: Match) => {
          return (
            <div className="home__card" key={match.time}>
              <div className="home__card-command">
                <Team />
                {match.awayTeam.name}
              </div>
              <div className="home__card-result">
                <div className="home__card-bill">
                  {match.homeScore} : {match.awayScore}
                </div>
                <div className={`home__card-status ${match.status}`}>{match.status}</div>
              </div>

              <div className="home__card-command">
                <Team />
                {match.homeTeam.name}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
