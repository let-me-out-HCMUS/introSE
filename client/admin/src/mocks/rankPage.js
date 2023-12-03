/*
 * rank: hạng
 * club: tên câu lạc bộ
 * played: số trận đã đá
 * won: số trận thắng
 * drawn: số trận hòa
 * lost: số trận thua
 * gf: số bàn thắng
 * ga: số bàn thua
 * gd: hiệu số
 * points: điểm
 * last5: mảng 5 trận gần nhất:
 * 1: thắng, 0: hòa, -1: thua
 */
export const ranks = [
  {
    club: "Hà Nội FC",
    played: 10,
    won: 8,
    draw: 1,
    lost: 1,
    gf: 20,
    ga: 10,
    gd: 10,
    points: 25,
    last5: ["W", "W", "W", "W", "W"],
  },
  {
    club: "Hồng Lĩnh Hà Tĩnh",
    played: 10,
    won: 7,
    draw: 1,
    lost: 2,
    gf: 20,
    ga: 10,
    gd: 10,
    points: 22,
    last5: ["W", "D", "L", "L", "W"],
  },
  {
    club: "Bình Định FC",
    played: 10,
    won: 7,
    draw: 1,
    lost: 2,
    gf: 20,
    ga: 10,
    gd: 10,
    points: 22,
    last5: ["W", "L", "W", "W", "L"],
  },
  {
    club: "Than Quảng Ninh",
    played: 10,
    won: 8,
    draw: 1,
    lost: 1,
    gf: 20,
    ga: 10,
    gd: 10,
    points: 25,
    last5: ["W", "W", "W", "W", "W"],
  },
  {
    club: "Hải Phòng FC",
    played: 10,
    won: 7,
    draw: 1,
    lost: 2,
    gf: 20,
    ga: 10,
    gd: 10,
    points: 22,
    last5: ["L", "D", "L", "W", "W"],
  },
  {
    club: "Sài Gòn FC",
    played: 10,
    won: 7,
    draw: 2,
    lost: 1,
    gf: 20,
    ga: 10,
    gd: 10,
    points: 24,
    last5: ["W", "W", "W", "D", "D"],
  },
];
