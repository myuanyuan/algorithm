// 创建一个数组列表来处理排序和搜索的数据结构
function ArrayList() {
    let arr = [];   
    
    this.insert = function(item) {  // 将数据插入到数组中
        arr.push(item);
    };
    
    this.show = function() {    // 展示数组的结构
        return arr.join(' < ');
    };

    // 冒泡排序
    this.bubbleSort = function () {
        let len = arr.length;
        for (let i = 0; i < len; i++) { 
            // 这里之所以再－i，是因为外层循环已经跑完一轮
            // 内循环就没有必要再比较一回了
            for (let j = 0; j < len - 1 - i; j++) {  
                if (arr[j] > arr[j + 1]) {  // 当前项和下一项做比较，如果大于的话就按照下面交换位置
                    // ES6利用解构赋值的方式轻松实现j和j+1值的交换
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
    };

    // 选择排序
    this.selectSort = function () {
        let len = arr.length,
            min;
        for (let i = 0; i < len - 1; i++) {
            min = i;    // 我们取第一个值当标杆
            for (let j = i; j < len; j++) { // 内部循环从i开始到数组结束
                if (arr[min] > arr[j]) {    // 比标杆的值还小，就替换新值
                    min = j;
                }
            }
            if (i !== min) {    // 上面经过一顿比较替换，如果标杆的值和之前取的第一个值不同了，就交换位置
                [arr[i], arr[min]] = [arr[min], arr[i]];
            }
        }
    };
    // 插入排序
    this.insertSort = function () {
        let len = arr.length,
            index, tmp;
        // 这里默认第一项已经排序了，直接从第二项开始
        for (let i = 1; i < len; i++) {
            index = i;        // 用来记录一个索引 
            tmp = arr[i];     // 储存一个临时变量，方便之后插入位置
            // 索引必须是大于0，并且数组前一项的值如果大于临时变量的值
            // 就将前一项的值赋给当期项，并且index--
            while (index > 0 && arr[index - 1] > tmp) { 
                arr[index] = arr[index - 1];   
                index--;  
            }
            arr[index] = tmp; // 最后在一顿替换后插入到了正确的位置上
        }
    };

    // 归并排序
    this.mergeSort = function () {
        arr = mergeRecurve(arr);    // 由于需要不停的拆分直到数组只有一项，所以使用递归来做
    };
    // 递归
    function mergeRecurve(arr) {
        let len = arr.length;
        // 递归的停止条件，如果数组只有一项，就直接返回了
        // 这也是我们递归的目的，直到数组只有一项
        if (len === 1) return arr;      
        let mid = Math.floor(len / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid, len);    // 到这里把数组一分为二

        // 为了不断对原数组拆分，对left和right数组继续递归，并作为参数传给merge函数
        // merge函数负责合并和排序小数组为大数组
        return merge(mergeRecurve(left), mergeRecurve(right));  
    }
    function merge(left, right) {   // 接收两个数组，最后合并到一起返回一个大数组
        let res = [],
            lLen = left.length,
            rLen = right.length,
            l = 0,
            r = 0;

        while (l < lLen && r < rLen) {
            // 如果left数组的项比right数组的项小的话，就将left这里小的项添加到大数组里
            if (left[l] < right[r]) {   
                res.push(left[l++]);    // 并继续下一项比较
            } else {
                res.push(right[r++]);   // 否则将right里小的项先添加到大数组中
            }
        }
        // 将left和right数组中剩余的项也都添加到大数组中
        while (l < lLen) {
            res.push(left[l++]);
        }
        while (r < rLen) {
            res.push(right[r++]);
        }

        return res;  // 返回排好序的大数组
    }
     // 快速排序
     this.quickSort = function () {
        quick(arr, 0, arr.length - 1);  // 递归
    }
    function quick(arr, left, right) {
        let index;
        if (arr.length > 1) {
            index = partition(arr, left, right);  // 划分

            if (left < index - 1) {
                quick(arr, left, index - 1)
            }
            if (index < right) {
                quick(arr, index, right);
            }
        }
    }
    // 划分函数
    function partition(arr, left, right) {
        let point = arr[Math.floor((left+right)/2)],
            i = left,
            j = right;  // 双指针
        
            while (i <= j) {
                while (arr[i] < point) {
                    i++;
                }
                while (arr[j] > point) {
                    j--;
                }
                if (i<=j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];  // 交换位置
                    i++;
                    j--;
                }
            }
            return i;
    }
}

// 测试用例，此测试用例在之后的算法中皆可使用
let arr = [2, 3, 1, 4, 6, 5];
let createList = function(arr) {
    let list = new ArrayList();
    for (let i = 0; i < arr.length; i++) {
        list.insert(arr[i]);
    }
    return list;
};
let item = createList(arr);
console.log(item.show()); // 排序前 5 < 4 < 3 < 2 < 1
// item.bubbleSort();
// item.selectSort();
// item.insertSort();
// item.mergeSort();
item.quickSort();
console.log(item.show()); // 排序后 1 < 2 < 3 < 4 < 5
