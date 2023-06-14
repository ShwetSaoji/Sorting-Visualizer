



//const n = 10
let array = [];
let speed;
init();

function init(){
    array = []
    var inp_as=document.getElementById('a_size');
    var n=parseInt(inp_as.value);

    
    
    for(let i=0;i<n;i++){
        array[i] = Math.random();
    }
    showBars();
}

function play(algo){
    const copy=[...array];
    let moves;
    switch(algo)
    {
        case 'bubble': moves =  bubbleSort(copy);
            break;
        case 'selection': moves =  selectionSort(copy);
            break;
        case 'heap': moves =  heapSort(copy);
            //return;
            break;
        case 'quick': moves =  quickSort(copy, 0, array.length -1);
            //return;
            break;
        case 'insertion': moves =  insertionSort(array);
            showBars();
            return;
            //break;
    }
    //let moves = selectionSort(copy);
    //console.log(moves);
    animate(moves);
    //console.log(copy);
}

function animate(moves){
    
    var inp_speed=document.getElementById('a_speed');
    speed= 500 - parseInt(inp_speed.value);
    
    console.log(speed);
    if(moves.length==0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type=="swap"){
        [array[i],array[j]] = [array[j],array[i]];
    }
    if(move.type=="insertion"){
        [array[i]] = [array[j]];
    }
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },speed);
}

// *****************************************BUBBLE SORT*****************************************  //
function bubbleSort(array){
    const moves = [];
    do{
        var swapped=false;
        for(let i=0;i<array.length;i++){
            moves.push({indices: [i-1, i], type:"comp"});
            if(array[i-1] > array[i]){
                swapped=true;
                moves.push({indices: [i-1, i], type:"swap"});
                [array[i-1],array[i]] = [array[i],array[i-1]];
            }
        }
    }while(swapped);
    return moves;
}

// *****************************************SELECTION SORT*****************************************  //
function selectionSort(array){
    const moves = [];
    for(let i=0;i<array.length;i++){
        let min = i;
        for(let j=i;j<array.length;j++){
            moves.push({indices: [i, j], type:"comp"});
            if(array[j]<array[min]){
                min = j;
            }
        }
        if(min !== i){
            moves.push({indices: [i, min], type:"swap"});
            [array[i],array[min]] = [array[min],array[i]];
        }
    }
    return moves;
}

// *****************************************INSERION SORT*****************************************  //
function insertionSort(array){
    const moves = [];
    for(let i=1;i<array.length;i++){
        let j = i-1;
        let key = array[i];
        moves.push({indices: [j, i], type:"comp"});
        while(j>=0 && array[j] > key){
            moves.push({indices: [j+1, j], type:"insertion"});
            array[j + 1] = array[j];
            j--;
        }
        moves.push({indices: [j+1, i], type:"insertion"});
        array[j + 1] = key; 
    }
    console.log(array);
    return moves;
}

// *****************************************HEAP SORT*****************************************  //
function heapSort(array){
    moves = []
    for(let i= Math.floor(array.length/2)-1 ; i >=0; i--){
        heapify(array, array.length, i, moves);
    }

    for(let i=array.length -1; i>0; i--){
        [array[0],array[i]] = [array[i],array[0]];
        moves.push({indices: [0, i], type:"swap"});

        heapify(array, i, 0, moves);
    }
    console.log(moves);
    return moves;
}

function heapify(arr, N, i){
    let largest = i;
    l = 2 * i + 1;
    r = 2 * i + 2;

    if (l < N && arr[l] > arr[largest])
            largest = l;

        // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest]) 
        largest = r;

        // If largest is not root
    moves.push({indices: [i, largest], type:"comp"});
    if (largest != i) {
        moves.push({indices: [i, largest], type:"swap"});
        [arr[i],arr[largest]] = [arr[largest], arr[i]];
        
        // Recursively heapify the affected sub-tree
        heapify(arr, N, largest);
    }
    //return moves;
}


// *****************************************QUICK SORT*****************************************  //

function quickSort(array, low, high){
    let moves = [];
    quickSortRecursive(array, low, high, moves);
    return moves;
}


function quickSortRecursive(array, low, high, moves){
   // moves = []
    if(low < high){
 
        let pi = partition(array, low, high, moves)
 
        quickSortRecursive(array, low, pi - 1, moves)

        quickSortRecursive(array, pi + 1, high, moves)
    }
}

function partition(array, low,high,moves){
    let pivot = array[high];
    let i = (low - 1); // index of smaller element
    for (let j = low; j <= high - 1; j++) {
        moves.push({indices: [j, high], type:"comp"});
        // If current element is smaller than or equal to pivot
        if (array[j] <= pivot) {
            i = i + 1;
            moves.push({indices: [i, j], type:"swap"});
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    moves.push({indices: [i+1, high], type:"swap"});
    [array[i+1], array[high]] = [array[high], array[i+1]]; 
    return i + 1
}



function showBars(move){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        //console.log(array[i]);
        const bar = document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
            move.type=="swap"?"yellow":"blue";
        }
        container.appendChild(bar);
    }
}