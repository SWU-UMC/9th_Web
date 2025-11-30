// 소수 인지 아닌지를 판단하는 함수
export const isPrime =(num: number):boolean=>{
    if(num<2) return false;

    for(let i=2; i<num; i++){
        if(num % i===0) return false;
    }

    return true;
};

// 소수인 함수를 배열에 넣는(push) 함수
export const findPrimeNumbers = (max:number):number[]=>{
    const primeNumbers=[];

    for(let i=2; i<=max; i++){
        if(isPrime(i)) primeNumbers.push(i);
    }

    return primeNumbers;
}