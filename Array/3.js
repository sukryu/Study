/*
문제: 주어진 배열에서 최대값과 최소값 찾기.
*/

let array = [1, 2, 3, 4, 5];

let max = Math.max(...array);
let min = Math.min(...array);

console.log('최대값: ', max);
console.log('최소값: ', min);