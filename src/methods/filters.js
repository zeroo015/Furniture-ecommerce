export function currency(num) {
  const n = parseInt(num, 10)
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
}

export function date(time) {
  const localDate = new Date(time * 1000) // 將後端傳來的 unix timestamp (一般取得的是秒數，但在 JS 中要帶入毫秒做計算) 轉換為一般的時間格式
  return localDate.toLocaleDateString()
}
