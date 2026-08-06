const HEADER_SELECTOR = '#main-header'

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return
  const header = document.querySelector(HEADER_SELECTOR)
  const offset = header?.offsetHeight + 30 ?? 0 // 上方留白 30px

  // scrollTo() 滾動到元素的指定座標位置
  // getBoundingClientRect() 取得區塊邊界位置
  window.scrollTo({
    top:
      target.getBoundingClientRect().top +
      window.scrollY -
      offset,
    behavior: 'smooth'
  })
}
