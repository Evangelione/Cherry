export const secToTime = (second) => {
  // let h = 0, m = 0
  // if (s > 60) {
  //   m = parseInt(s / 60)
  //   s = parseInt(s % 60)
  //   if (m > 60) {
  //     h = parseInt(m / 60)
  //     m = parseInt(m % 60)
  //   }
  // }
  // const zero = (v) => {
  //   return (v >> 0) < 10 ? ('0' + v) : v
  // }
  // return (h == 0 ? [zero(m), zero(s)].join(':') : [zero(h), zero(m), zero(s)].join(':'))
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}
