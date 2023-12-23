import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
export default function FormAddGoal({ submitAdd }) {
  const types = 4;

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
          <input
            type="text"
            className=" input-field"
            {...register("Ten", { required: true })}
          />
          {errors.Ten && <p className="error-field">*Không hợp lệ*</p>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Thời điểm ghi bàn</label>
          <input
            className=" input-field"
            type="number"
            {...register("ThoiDiem", { required: true, min: 1, max: 120 })}
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
            {...register("Loai", {
              required: true,
            })}
            className="rounded border-2 border-green-300 ml-4"
          >
            {Array.from(Array(types).keys()).map((item, index) => (
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
            Thêm
          </button>
        </div>
      </form>
    </>
  );
}
