export function uniques (arr) {
  return arr.filter(function (elem, index, self) {
    return index === self.indexOf(elem)
  })
}
