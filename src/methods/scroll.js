const HEADER_SELECTOR = '#main-header'

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return
  const header = document.querySelector(HEADER_SELECTOR)
  const diffTop = window.innerWidth < 768 ? 80 : 20 // 上方偏移量，MB:80px / PC:20px
  const offset = header?.offsetHeight + diffTop ?? 0

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
