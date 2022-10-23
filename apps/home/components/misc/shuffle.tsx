function shuffle(array: any[]) {
  return array.sort((a, b) => 0.5 - Math.random());
}
export default shuffle;
