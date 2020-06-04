async function testPromises() {
  console.log('Promise A');
  let promiseA = new Promise(function(resolve, reject){
    setTimeout(function(){
      (Math.random() > 0.3) ? resolve('>>resolved value<<') : reject('>>rejected value<<')
    }, 100)
  }).then((resolve) => {
    return ('Promise A: 70% of the time, this is the resolved value: ' + resolve)
  }, (reject) => {
    return ('Promise A: 30% of the time, this should be printed instead: ' + reject)
  })
  console.log(promiseA);

  console.log('Promise B');
  let promiseB = new Promise(function(resolve, reject){
    setTimeout(function(){
      (Math.random() > 0.3) ? resolve('>>resolved value<<') : reject('>>rejected value<<')
    }, 100)
  }).then((resolve) => {
    return ('Promise B: 70% of the time, this is the resolved value: ' + resolve)
  }, (reject) => {
    return ('Promise B: 30% of the time, this should be printed instead: ' + reject)
  })
  console.log(promiseB);

  let [promiseARes, promiseBRes] = await Promise.all([promiseA, promiseB])
  console.log('Promise A: ', promiseA);
  console.log('Promise B: ', promiseB);

  console.log('Promise A Res: ', promiseARes);
  console.log('Promise B Res: ', promiseBRes);

}

testPromises()