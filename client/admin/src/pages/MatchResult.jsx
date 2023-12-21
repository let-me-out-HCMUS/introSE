/* eslint-disable react/prop-types */
export default function MatchResult({ id }) {
  // const date = new Date();
  // const time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  // var test = new Date(2023,0,1)
  // console.log(test)

  // const  isPlayed = () => {
  //     if(date> test){
  //         return true
  //     }
  //     return false
  // }

  return (
    <div className="flex w-auto justify-center pt-32">
      {/* <h1 className="mb-10">{time}</h1>
            <h1 className="mb-10">{test}</h1>
            <h1>{isPlayed() ? time : test} {id}</h1> */}
      <div className="w-full bg-white">
        <div className="flex-start flex">
          <h1>Giải bóng siêu cấp vô địch</h1>
          <p>21/12 {id}</p>
        </div>
        <div className="flex items-center justify-around mt-10">
          <div>
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
              alt="logo"
              className=" h-20 w-20"
            />
            <h1 className="mt-4">Real Madrid</h1>
          </div>
          <div className=" text-5xl tracking-[20px]">3 - 2</div>
          <div>
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
              alt="logo"
              className=" h-20 w-20"
            />
            <h1 className="mt-4">Real Madrid</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10 px-8">
            <ul>
                <li className="flex space-x-2">
                    <div>Cristiano Ronaldo</div>
                    <div>90`</div>
                    <div>A</div>
                </li>
                <li className="flex space-x-2">
                    <div>Cristiano Ronaldo</div>
                    <div>90`</div>
                    <div>A</div>
                </li>
            </ul>
            <div>⚽</div>
            <ul>
                <li className="flex space-x-2">
                    <div>Cristiano Ronaldo</div>
                    <div>90`</div>
                    <div>A</div>
                </li>
                <li className="flex space-x-2">
                    <div>Cristiano Ronaldo</div>
                    <div>90`</div>
                    <div>A</div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
}
