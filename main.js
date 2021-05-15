/* composition(X,n,m) = f_X^m(n) */
  var composition=function(X,n,m){
  if(m==0)return n;
  else if(m==1)return fgh(X,n);
  else return composition(X,fgh(X,n),m-1);
}

/* https://googology.wikia.org/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:Kanrokoti/%E3%81%8F%E3%81%BE%E3%81%8F%E3%81%BE3%E5%A4%89%E6%95%B0%CF%88#.E5.B7.A8.E5.A4.A7.E9.96.A2.E6.95.B0 */
var fgh=function(X,n){
  //1. If X=0, then f_X(n)=n+1
  if(X.iszero()) return n+1;
  //2. If X=$1 or X=Y+$1 for some Y in T, then f_X(n)=f_X[0]^n(n)
  else if(X.isone() || (X.isadd() && X.a[X.a.length-1].isone())) return composition(X.expand(Kuma3ary.k0),n,n);
  //3. If neither or them, them f_X(n)=f_{X[$n]}(n)
  else return fgh(X.expand(new Kuma3ary(n)),n);
};

var g=function(n){
  //1. If n=0, then g(n)=p_0(0,0).
  if(n==0)return Kuma3ary.k0;
  //2. Otherwise, then g(n)=p_{g(n-1)}(0,0).
  else return new Kuma3ary(",", [g(n-1),Kuma3ary.k0,Kuma3ary.k0])
}

var F=function(n){
  //F(n)=f_{p_0(0,g(n))}(n).
  return fgh(new Kuma3ary(",",[0,0,g(n)]),n);
}

var thenumber = function(){
  var googolplex=1;
  for(i=0;i<100;i++)googolplex*=10;

  //I name F^10^100(10^100) "Kumakuma 3 variables Psi number.
  var _thenumber=F(googolplex);
  for(i=1;i<googolplex;i++)_thenumber = F(_thenumber);

  return _thenumber;
}

