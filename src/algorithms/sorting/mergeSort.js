export function* mergeSort(array) {
  if (array.length <= 1) return;

  // Helper function to merge two sorted halves
  function* merge(arr, start, mid, end) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      yield { type: 'compare', indices: [k, k] }; // or [start + i, mid + 1 + j] to highlight comparisons

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      yield { type: 'overwrite', indices: [k], array: [...arr] };
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      yield { type: 'overwrite', indices: [k], array: [...arr] };
      i++; k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      yield { type: 'overwrite', indices: [k], array: [...arr] };
      j++; k++;
    }
  }

  function* mergeSortHelper(arr, start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    yield* mergeSortHelper(arr, start, mid);
    yield* mergeSortHelper(arr, mid + 1, end);
    yield* merge(arr, start, mid, end);
  }

  yield* mergeSortHelper(array, 0, array.length - 1);
}