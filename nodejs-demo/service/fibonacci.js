/**
 * Created with IntelliJ IDEA.
 * User: cww
 * Date: 15-5-26
 * Time: 下午1:02
 * To change this template use File | Settings | File Templates.
 */
function fibonacci(n){
    if(isNaN(n)){throw new Error('n should be a Number')};
    if(n<0){throw new Error('n should >= 0')};
    if(n>10){throw new Error('n should <= 10')};
    if(n==0){return 0;}
    if(n==1){return 1;}
    if(n>1){
        return fibonacci(n-1)+fibonacci(n-2);
    }
}

if(require.main === module){
    var n = Number(process.argv[2]);
    console.log(n);
    console.log(fibonacci(n));

}
module.exports = fibonacci;