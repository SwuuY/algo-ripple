export function* insertionSort(arr) {
  const array = [...arr];

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    yield { type: 'compare', indices: [i, j], array: [...array] };

    while (j >= 0 && array[j] > key) {
      yield { type: 'compare', indices: [j, j + 1], array: [...array] };

      array[j + 1] = array[j]; // shift element right
      yield { type: 'swap', indices: [j, j + 1], array: [...array] };

      j = j - 1;
    }

    array[j + 1] = key;
    yield { type: 'insert', indices: [j + 1], array: [...array] };
  }

  yield { type: 'done', array: [...array] };
}