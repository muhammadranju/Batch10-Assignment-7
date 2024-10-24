import { useState } from "react";
import playersData from "../../assets/data/data.json";
import { useEffect } from "react";
import Card from "./Card";
import Types from "prop-types";

import { RiDeleteBin6Line } from "react-icons/ri";
import CardPlaceholder from "../UI/CardPlaceholder";

const Cards = ({ handelPlayerPrice, selectedPlayers, handelRemovePlayer }) => {
  const [players, setPlayers] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handelAvailableStyle = () => {
    setIsAvailable(true);
    setIsSelected(false);
  };
  const handelSelectedStyle = () => {
    setIsAvailable(false);
    setIsSelected(true);
  };
  setTimeout(() => {
    return setIsLoading(false);
  }, 1000);
  useEffect(() => {
    setPlayers(playersData);
  }, []);

  return (
    <div className=" mt-10 ">
      <div className="flex lg:justify-between flex-col lg:flex-row gap-3 justify-center lg:items-start items-center mb-10">
        <h1 className="text-2xl font-bold">{`${
          isAvailable
            ? "Available Players"
            : `Selected Players (${selectedPlayers?.length}/6)`
        }`}</h1>
        {/*  */}
        <div className="join sticky top-0">
          <button
            onClick={handelAvailableStyle}
            className={`btn  join-item ${
              isAvailable
                ? "bg-[#E7FE29] hover:bg-[#E7FE90] border-0 font-black"
                : "bg-transparent font-semibold text-gray-500"
            }`}
          >
            Available
          </button>
          <button
            onClick={handelSelectedStyle}
            className={`btn join-item ${
              isSelected
                ? "bg-[#E7FE29] hover:bg-[#E7FE90] border-0 font-black"
                : "bg-transparent font-semibold text-gray-500"
            }`}
          >
            Selected <span>({selectedPlayers?.length})</span>
          </button>
        </div>
      </div>

      <div
        className={`grid lg:grid-cols-3 grid-cols-1 gap-5 ${
          isAvailable && !isLoading ? "" : "hidden"
        } `}
      >
        {players.map((card) => (
          <Card
            key={card.playerId}
            card={card}
            handelPlayerPrice={handelPlayerPrice}
          />
        ))}
      </div>

      <div
        className={`grid lg:grid-cols-3 grid-cols-1 gap-5 ${
          isLoading ? "" : "hidden"
        }`}
      >
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
      </div>
      <div className={` ${!isAvailable ? "space-y-3" : "hidden"} `}>
        {selectedPlayers?.map((player) => (
          <div
            key={player.playerId}
            className="flex items-center justify-between border rounded-xl p-5"
          >
            <div className="flex items-center gap-x-4">
              <img
                src={player.image}
                className="w-20 h-20 object-cover rounded-xl"
                alt=""
              />
              <div className="">
                <h3 className="font-bold text-lg mb-1">{player?.name}</h3>
                <span className="">{player?.role}</span>
              </div>
            </div>
            <button
              onClick={() => handelRemovePlayer(player)}
              className="text-red-500 cursor-pointer p-3 text-2xl"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ))}
        <h1
          className={`text-center font-bold text-2xl ${
            selectedPlayers?.length <= 0 ? "" : "hidden"
          }`}
        >
          Player Selected data not found!{" "}
        </h1>
        <button
          onClick={handelAvailableStyle}
          className={`btn  join-item ${
            !isAvailable
              ? "bg-[#E7FE29] hover:bg-[#E7FE90] border-0"
              : "bg-transparent"
          }`}
        >
          Add More Player
        </button>
      </div>
    </div>
  );
};
Cards.propTypes = {
  handelPlayerPrice: Types.func.isRequired,
  selectedPlayers: Types.array.isRequired,
  handelRemovePlayer: Types.func.isRequired,
};
export default Cards;
