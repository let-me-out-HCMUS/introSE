import { useForm } from "react-hook-form";
import { Cauthu } from "../../mocks/match-result";
import { getRule } from "../../services/apiRule";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */
export default function FormAddGoal({ submitAdd }) {
  const { data } = useQuery(["rule"], () => getRule());
  const [rule, setRule] = useState(null);
  useEffect(() => {
    if (data) {
      setRule(data);
    }
  }, [data]);

  
  
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

//   TODO: list players in club to input
  return (
    <>
      <form onSubmit={handleSubmit(submitAdd)} className="min-w-[300px]">
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
            <select
                {...register("Ten", {
                required: true,
                })}
                className="input-field"
            >
                {Cauthu.map((item, index) => (
                <option key={index} value={item.Ten}>
                    {item.Ten}
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
            {...register("ThoiDiem", { required: true, min:1, max: rule?.goal.maxTime })}
          />
          {errors.ThoiDiem && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="form-group !flex">
          <label htmlFor="">Loại bàn thắng: </label>
          <select
            {...register("Loai", {
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
            {...register("Phanluoi")}
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
