
/* eslint-disable react/prop-types */
export default function FormAddGoal({ submitAdd }) {
  

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitAdd();
          // console.log(formValues)
          
        }}
        className="min-w-[300px]"
      >
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            id="name"
            type="text"
            name="name"
            className=" input-field"
            // value={formValues.name}
            // onChange={(e) => handleChange(e)}
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
