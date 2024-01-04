import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRule } from "../../services/apiRule";
import { getPlayersClub } from "../../services/apiPlayers";

/* eslint-disable react/prop-types */
export default function FormAddGoal({ submitAdd, clubId }) {
  const { data: ruleData } = useQuery(["rule"], async () => await getRule());
  const { data: playerData } = useQuery(["player"], async () => await getPlayersClub(clubId));

  const [rule, setRule] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (ruleData) {
      setRule(ruleData);
    }
  }, [ruleData]);

  useEffect(() => {
    if (playerData) {
      setPlayers(playerData);
      console.log(playerData);
    }
  }, [playerData]);

  
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  

  useEffect(() => {
    if (watch("playerid"))
      setValue("player", players.find((item) => item.id === watch("playerid")));
    else
      setValue("player", players[0]);
  },[watch("playerid"),players])

//   TODO: list players in club to input
  return (
    <>
      <form onSubmit={handleSubmit(submitAdd)} className="min-w-[300px]">
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
            <select
                {...register("playerid", {
                })}
                className="input-field"
            >
                {players.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.name}
                </option>
                ))}
            </select>
          {errors.Ten && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="form-group">
          <label htmlFor="">Thời điểm ghi bàn</label>
          <input
            className=" input-field"
            type="number"
            {...register("time", { required: true, min:1, max: rule?.goal.maxTime })}
          />
          {errors.ThoiDiem && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="form-group !flex">
          <label htmlFor="">Loại bàn thắng: </label>
          <select
            {...register("goalType", {
              required: true,
            })}
            className="rounded border-2 border-green-300 ml-4"
          >
            {Array.from(Array(rule?.goal.quantityType).keys()).map((item, index) => (
              <option key={index} value={String.fromCharCode(65 + item)}>
                {String.fromCharCode(65 + item)}
              </option>
            ))}
          </select>
          {errors.Ten && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="form-group !flex">
          <label htmlFor="">Phản lưới nhà: </label>
          <input
            className=" ml-4"
            type="checkbox"
            {...register("isOwnGoal")}
          />
        </div>

        <div className="inline-flex w-full flex-row justify-end pt-4">
          <button className="btn ml-2" type="submit">
            Thêm
          </button>
        </div>
      </form>
    </>
  );
}
