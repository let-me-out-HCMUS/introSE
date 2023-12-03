import { rule } from "../../mocks/rule";
import { useForm } from "react-hook-form";

export default function RuleForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ defaultValues: rule });

  //   Todo: submit data to server
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative mx-auto px-16">
      <div className="group-rule">
        <h1>Cầu thủ</h1>
        <div className="rule-content flex w-full">
          <div className="rule-half">
            <div className="field">
              <label>Tuổi tối thiểu:</label>
              <input type="number" {...register("club.minAge")} />
            </div>
            <div className="field">
              <label>Tuổi tối đa:</label>
              <input type="number" {...register("club.maxAge")} />
            </div>
            <div className="field">
              <label>Giới hạn cầu thủ nước ngoài:</label>
              <input type="number" {...register("club.maxForeigners")} />
            </div>
          </div>
          <div className="rule-half">
            <div className="field">
              <label>Số lượng tối thiểu trong đội:</label>
              <input type="number" {...register("club.minPlayers")} />
            </div>
            <div className="field">
              <label>Số lượng tối đa trong đội:</label>
              <input type="number" {...register("club.maxPlayers")} />
            </div>
          </div>
        </div>
      </div>

      <div className="group-rule">
        <h1>Bàn thắng</h1>
        <div className="rule-content flex w-full">
          <div className="rule-half">
            <div className="field">
              <label>Số lượng loại:</label>
              <input type="number" {...register("goal.quantityType")} />
            </div>
          </div>
          <div className="rule-half">
            <div className="field">
              <label>Thời điểm ghi bàn tối đa:</label>
              <input type="number" {...register("goal.maxTime")} />
            </div>
          </div>
        </div>
      </div>

      <div className="group-rule">
        <h1>Điểm số</h1>
        <div className="rule-content flex w-full">
          <div className="rule-half">
            <div className="field">
              <label>Điểm thắng:</label>
              <input type="number" {...register("point.win")} />
            </div>
            <div className="field">
              <label>Điểm hoà:</label>
              <input type="number" {...register("point.draw")} />
            </div>
            <div className="field">
              <label>Điểm thua:</label>
              <input type="number" {...register("point.lose")} />
            </div>
          </div>
          <div className="rule-half">
            <div className="field">
              <label>Thứ tự ưu tiên 1:</label>
              <input className="!w-32" {...register("point.priority[0]")} />
            </div>
            <div className="field">
              <label>Thứ tự ưu tiên 2:</label>
              <input className="!w-32" {...register("point.priority[1]")} />
            </div>
            <div className="field">
              <label>Thứ tự ưu tiên 3:</label>
              <input className="!w-32" {...register("point.priority[2]")} />
            </div>
            <div className="field">
              <label>Thứ tự ưu tiên 4:</label>
              <input className="!w-32" {...register("point.priority[3]")} />
            </div>
          </div>
        </div>
      </div>

      {errors.club && <span>This field is required</span>}
      <div className="button flex w-full justify-end">
        <button
          type="submit"
          className="rounded bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
