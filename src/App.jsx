import React, { useState, useEffect } from "react";
import "./App.scss";
import { position, height, shuffle } from "./utils";

const commonPlayers = [
  "이건희_G_161",
  "허경태_G_163",
  "조형원_G_173",
  "조성진_G_170",
  "김성림_F_175",
  "김용일_F_175",
  "권용일_G_177",
  "이건두_G_178",
  "김준식_F_181",
  "구광수_C_184",
  "김치영_F_181",
  "심용권_F_175",
  "박주현_C_184",
  "조재호_G_174",
];

function App() {
  const [suggestions, setSuggestions] = useState(commonPlayers);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const fullPlayers = players.length === 18;

  useEffect(() => {
    setSuggestions(commonPlayers.filter((s) => !players.includes(s)));
  }, [players]);

  const addPlayer = (name) => {
    if (!name || fullPlayers) return;
    if (!players.includes(name)) {
      setPlayers([...players, name]);
    }
  };

  const removePlayer = (e) => {
    const name = e.target.textContent;
    setPlayers(players.filter((p) => p !== name));
    setTeam1([]);
    setTeam2([]);
  };

  const onSubmitPlayer = (e) => {
    e.preventDefault();
    addPlayer(newPlayer.toUpperCase());
    setNewPlayer("");
  };

  const buildTeamsRandom = () => {
    const playersCopy = [...players];
    const shuffledPlayers = shuffle(playersCopy);
    setTeam1(shuffledPlayers.filter((_, index) => index < players.length/2));
    setTeam2(shuffledPlayers.filter((_, index) => index >= players.length/2));
  };

  const buildTeamsHeight = () => {
    const playersCopy = [...players];
    const shuffledPlayers = height(playersCopy);
    setTeam1(shuffledPlayers.filter((_, index) => index % 2 == 0));
    setTeam2(shuffledPlayers.filter((_, index) => index % 2 == 1));
  };

  const buildTeamsPosition = () => {
    const playersCopy = [...players];
    const shuffledPlayers = position(playersCopy);
    setTeam1(shuffledPlayers.filter((_, index) => index % 2 == 0));
    setTeam2(shuffledPlayers.filter((_, index) => index % 2 == 1));
  };

  const teamsToString = () =>
    `Team 1: \n${team1[0]}\n${team1[1]}\n${team1[2]}\n${team1[3]}\n${team1[4]}\n\nTeam 2:\n${team2[0]}\n${team2[1]}\n${team2[2]}\n${team2[3]}\n${team2[4]}`;

  return (
    <div className="app-content">
      <h1>와이드오픈 팀 빌더</h1>
      <ul className="players-suggestions">
        {suggestions.map((player) => (
          <li key={player} onClick={(e) => addPlayer(e.target.textContent)}>
            {player}
          </li>
        ))}
      </ul>
      <form className="add-player" onSubmit={onSubmitPlayer}>
        <input
          value={newPlayer}
          type="text"
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="이름_포지션_신장"
          // disabled={fullPlayers}
        />
        <button disabled={fullPlayers || !newPlayer}>추가</button>
      </form>
      <div className="players-teams-container">
        {players.length ? (
          <div>
            <h2>Players</h2>
            <ol className="players">
              {players.map((player) => (
                <li onClick={removePlayer} key={player}>
                  {player}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {team1.length && team2.length && players.length ? (
          <div>
            <h2>Teams</h2>
            <div className="teams">
              <ul>
                {team1.map((player) => (
                  <li className="team-1-player" key={player}>
                    {player}
                  </li>
                ))}
              </ul>
              <ul>
                {team2.map((player) => (
                  <li className="team-2-player" key={player}>
                    {player}
                  </li>
                ))}
              </ul>
            </div>
            <img
              className="copy-to-clipboard"
              onClick={() => {
                navigator.clipboard.writeText(teamsToString());
              }}
              src="/copy.svg"
              role="button"
            />
          </div>
        ) : null}
      </div>

      <div className = "button">
        <button
          style={{ margin: "20px 20px" }}
          disabled={!players.length}
          onClick={buildTeamsRandom}
        >
          랜덤
        </button>

        <button
          style={{ margin: "20px 20px" }}
          disabled={!players.length}
          onClick={buildTeamsHeight}
        >
          신장
        </button>

        <button
          style={{ margin: "20px 20px" }}
          disabled={!players.length}
          onClick={buildTeamsPosition}
        >
          포지션
        </button>
      </div>
      

    </div>
  );
}

export default App;
