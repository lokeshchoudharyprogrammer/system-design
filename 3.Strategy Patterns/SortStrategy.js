

class SortStrategy {
    sort(arr) {
        throw new Error("sort() not implemented");
    }
}


class BubbleSort extends SortStrategy {
    sort(arr) {
        let a = [...arr];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                }
            }
        }
        return a;
    }
}


class QuickSort extends SortStrategy {
    sort(arr) {
        if (arr.length <= 1) return arr;

        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) left.push(arr[i]);
            else right.push(arr[i]);
        }

        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}

class MergeSort extends SortStrategy {
    sort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = this.sort(arr.slice(0, mid));
        const right = this.sort(arr.slice(mid));

        return this.merge(left, right);
    }

    merge(left, right) {
        const result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) result.push(left[i++]);
            else result.push(right[j++]);
        }

        return [...result, ...left.slice(i), ...right.slice(j)];
    }
}


class Sorter {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    sort(arr) {
        return this.strategy.sort(arr);
    }
}


const data = [5, 2, 9, 1, 3];

const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort(data), " Bubble sort"); // Bubble sort

sorter.setStrategy(new QuickSort());
console.log(sorter.sort(data), " Quick sort"); // Quick sort

sorter.setStrategy(new MergeSort());
console.log(sorter.sort(data), " Merge sort"); // Merge sort
