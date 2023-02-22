const my_function = (x) => {
    const ans = (x) => {
      if (Math.floor(x/0.1)%2==0) {return 1}
      else {return 0}
    }
    return [ans(x), 0]
  }
  
const fourier_transform = (func, n, delta_t=0.01) => {
    sum = [0,0]
    for (let i=0; i<1/delta_t; i++) {
      t=i*delta_t
      let ans = func(t)
      if (n==0) console.log(t, ans)
      sum[0] += (Math.cos(-2*Math.PI * n * t) * ans[0] - Math.sin(-2*Math.PI * n * t) * ans[1])* delta_t
      sum[1] += (Math.cos(-2*Math.PI * n * t) * ans[1] + Math.sin(-2*Math.PI * n * t) * ans[0])* delta_t
    }
    if (Math.abs(sum[0])<10**-5) sum[0]=0
    if (Math.abs(sum[1])<10**-5) sum[1]=0
    return sum
  }



  for (let i=-10; i<11; i++) {
        console.log(fourier_transform(my_function, i, 0.01), i)
  }