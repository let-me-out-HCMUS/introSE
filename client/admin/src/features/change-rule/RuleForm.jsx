import { useEffect, useState } from "react";
// import { rule } from "../../mocks/rule";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getRule, updateRule } from "../../services/apiRule";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function RuleForm() {
  const { data, refetch } = useQuery(["rule"], () => getRule(), { refetchOnWindowFocus: true});

  const { mutate } = useMutation({
    mutationFn: (data) => {
      updateRule(data);
    },
    onSuccess: () => {
      toast.success("Lưu thành công");
    },
    onError: () => {
      toast.error("Lưu thất bại");
    },
  });

  const [isEditting, setIsEditting] = useState(false);
  // const [rule, setRule] = useState({});

  useEffect(() => {
    refetch();
    if (data) {
      setValue("club.minAge", data.club.minAge);
      setValue("club.maxAge", data.club.maxAge);
      setValue("club.maxForeigners", data.club.maxForeigners);
      setValue("club.minPlayers", data.club.minPlayers);
      setValue("club.maxPlayers", data.club.maxPlayers);
      setValue("goal.quantityType", data.goal.quantityType);
      setValue("goal.maxTime", data.goal.maxTime);
      setValue("point.win", data.point.win);
      setValue("point.draw", data.point.draw);
      setValue("point.lose", data.point.lose);
      // setValue("point.priority", data.point.priority);
      setValue("point.priority[0]", data.point.priority[0]);
      setValue("point.priority[1]", data.point.priority[1]);
      setValue("point.priority[2]", data.point.priority[2]);
      setValue("point.priority[3]", data.point.priority[3]);
      // console.log(data);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const watchPriority = watch("point.priority");

  // console.log(watchPriority);
  //   Todo: submit data to server
  const onSubmit = (newdata) => {
    console.log(newdata);
    mutate(newdata);
    setIsEditting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto bg-white px-16 py-4"
    >
      <div className="group-rule">
        <h1>Cầu thủ</h1>
        <div className="rule-content flex w-full">
          <div className="rule-half">
            <div className="field">
              <label>Tuổi tối thiểu:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("club.minAge", { required: true, min: 0 })}
              />
            </div>
            {errors.club?.minAge && (
              <p className="error-field">*Không hợp lệ*</p>
            )}

            <div className="field">
              <label>Tuổi tối đa:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("club.maxAge", { required: true, min: 0 })}
              />
            </div>
            {errors.club?.maxAge && (
              <p className="error-field">*Không hợp lệ*</p>
            )}

            <div className="field">
              <label>Giới hạn cầu thủ nước ngoài:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("club.maxForeigners", { required: true, min: 0 })}
              />
            </div>
            {errors.club?.maxForeigners && (
              <p className="error-field">*Không hợp lệ*</p>
            )}
          </div>

          <div className="rule-half">
            <div className="field">
              <label>Số lượng tối thiểu trong đội:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("club.minPlayers", { required: true, min: 0 })}
              />
            </div>
            {errors.club?.minPlayers && (
              <p className="error-field">*Không hợp lệ*</p>
            )}

            <div className="field">
              <label>Số lượng tối đa trong đội:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("club.maxPlayers", { required: true, min: 0 })}
              />
            </div>
            {errors.club?.maxPlayers && (
              <p className="error-field">*Không hợp lệ*</p>
            )}
          </div>
        </div>
      </div>

      <div className="group-rule">
        <h1>Bàn thắng</h1>
        <div className="rule-content flex w-full">
          <div className="rule-half">
            <div className="field">
              <label>Số lượng loại:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("goal.quantityType", { required: true, min: 0 })}
              />
            </div>
            {errors.goal?.quantityType && (
              <p className="error-field">*Không hợp lệ*</p>
            )}
          </div>

          <div className="rule-half">
            <div className="field">
              <label>Thời điểm ghi bàn tối đa:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("goal.maxTime", { required: true, min: 0 })}
              />
            </div>
            {errors.goal?.maxTime && (
              <p className="error-field">*Không hợp lệ*</p>
            )}
          </div>
        </div>
      </div>

      <div className="group-rule">
        <h1>Điểm số</h1>
        <div className="rule-content flex w-full">
          <div className="rule-half">
            <div className="field">
              <label>Điểm thắng:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("point.win", {
                  required: true,
                  validate: (value) => value > watch("point.draw"),
                })}
              />
            </div>
            {errors.point?.win && <p className="error-field">*Không hợp lệ*</p>}

            <div className="field">
              <label>Điểm hoà:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("point.draw", {
                  required: true,
                  validate: (value) => value > watch("point.lose"),
                })}
              />
            </div>
            {errors.point?.draw && (
              <p className="error-field">*Không hợp lệ*</p>
            )}

            <div className="field">
              <label>Điểm thua:</label>
              <input
                disabled={!isEditting}
                type="number"
                {...register("point.lose", { required: true })}
              />
            </div>
            {errors.point?.lose && (
              <p className="error-field">*Không hợp lệ*</p>
            )}
          </div>
          <div className="rule-half">
            {/* <input
                disabled={!isEditting}
                className="!w-32"
                {...register("point.priority[0]")}
              /> */}
            <div className="field inline-flex">
              <label>Thứ tự ưu tiên 1: </label>
              <select
                disabled={!isEditting}
                {...register("point.priority[0]", {
                  required: true,
                  validate: (value) =>
                    value !== watchPriority[1] &&
                    value !== watchPriority[2] &&
                    value !== watchPriority[3],
                })}
              >
                <option value="points">Điểm</option>
                <option value="goalDifference">Hiệu số</option>
                <option value="totalGoals">Tổng bàn thắng</option>
              </select>
            </div>
            <div className="field inline-flex">
              <label>Thứ tự ưu tiên 2: </label>
              <select
                disabled={!isEditting}
                {...register("point.priority[1]", {
                  required: true,
                  validate: (value) =>
                    value !== watchPriority[0] &&
                    value !== watchPriority[2] &&
                    value !== watchPriority[3],
                })}
              >
                <option value="points">Điểm</option>
                <option value="goalDifference">Hiệu số</option>
                <option value="totalGoals">Tổng bàn thắng</option>
                <option value="headToHead">Đối kháng</option>
              </select>
            </div>
            <div className="field inline-flex">
              <label>Thứ tự ưu tiên 3: </label>
              <select
                disabled={!isEditting}
                {...register("point.priority[2]", {
                  required: true,
                  validate: (value) =>
                    value !== watchPriority[0] &&
                    value !== watchPriority[1] &&
                    value !== watchPriority[3],
                })}
              >
                <option value="points">Điểm</option>
                <option value="goalDifference">Hiệu số</option>
                <option value="totalGoals">Tổng bàn thắng</option>
                <option value="headToHead">Đối kháng</option>
              </select>
            </div>
            <div className="field inline-flex">
              <label>Thứ tự ưu tiên 4: </label>
              <select
                disabled={!isEditting}
                {...register("point.priority[3]", {
                  required: true,
                  validate: (value) =>
                    value !== watchPriority[0] &&
                    value !== watchPriority[1] &&
                    value !== watchPriority[2],
                })}
              >
                <option value="points">Điểm</option>
                <option value="goalDifference">Hiệu số</option>
                <option value="totalGoals">Tổng bàn thắng</option>
                <option value="headToHead">Đối kháng</option>
              </select>
            </div>

            {/* <div className="field">
              <label>Thứ tự ưu tiên 2:</label>
              <input
                disabled={!isEditting}
                className="!w-32"
                {...register("point.priority[1]")}
              />
            </div>
            <div className="field">
              <label>Thứ tự ưu tiên 3:</label>
              <input
                disabled={!isEditting}
                className="!w-32"
                {...register("point.priority[2]")}
              />
            </div>
            <div className="field">
              <label>Thứ tự ưu tiên 4:</label>
              <input
                disabled={!isEditting}
                className="!w-32"
                {...register("point.priority[3]")}
              />
            </div> */}
            {errors.point?.priority && (
              <p className="error-field">*Lựa chọn bị trùng*</p>
            )}
          </div>
        </div>
      </div>

      {errors.club && <span>This field is required</span>}
      <div className="button flex w-full justify-end">
        {!isEditting ? (
          <button
            onClick={() => setIsEditting(true)}
            type="button"
            className="ml-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Chỉnh sửa
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEditting(false);
                reset(data);
              }}
              type="button"
              className="rounded bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700"
            >
              Huỷ
            </button>

            <button
              type="submit"
              className="ml-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Lưu
            </button>
          </>
        )}
      </div>
    </form>
  );
}
