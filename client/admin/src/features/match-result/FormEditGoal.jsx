import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRule } from "../../services/apiRule";

/* eslint-disable react/prop-types */
export default function FormEditGoal({ submitEdit, goal }) {
  const { data: ruleData } = useQuery(["rule"], async () => await getRule());

  const [rule, setRule] = useState(null);
  
  useEffect(() => {
    if (ruleData) {
      setRule(ruleData);
    }
  }, [ruleData]);

  const {
    register,
    handleSubmit,
    // watch,

    formState: { errors },
  } = useForm({defaultValues: goal});

//   TODO: list players in club to input
  return (
    <>
      <form onSubmit={handleSubmit(submitEdit)} className="min-w-[300px]">
    
        <div className="form-group">
          <label htmlFor="name">Thời điểm ghi bàn</label>
          <input
            className=" input-field"
            type="number"
            {...register("time", { required: true, min: 1, max: 120 })}
          />
          {errors.ThoiDiem && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="form-group !flex">
          <label htmlFor="name">Loại bàn thắng: </label>
          {/* <input
            type="text"
            className=" input-field"
            {...register("Loai", { required: true })}
          /> */}
          <select
            {...register("goalType", {
              required: true,
            })}
            defaultValue={goal.goalType}
            className="rounded border-2 border-green-300 ml-4"
          >
            {Array.from(Array(rule?.goal.quantityType).keys()).map((item, index) => (
              <option key={index} value={String.fromCharCode(65 + item)}>
                {/* {item + 1} */}
                {String.fromCharCode(65 + item)}
              </option>
            ))}
          </select>
          {errors.Ten && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="inline-flex w-full flex-row justify-end pt-4">
          <button className="btn ml-2" type="submit">
            Xác nhận
          </button>
        </div>
      </form>
    </>
  );
}
