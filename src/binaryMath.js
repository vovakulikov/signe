/**
 * Created by Vova on 12.03.2017.
 */


export function NthDigit(num, digit){
    let digitNumber = Math.pow(2,digit)-1;
    return (num | digitNumber).toString(2);
}