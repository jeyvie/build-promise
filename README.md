# 构建 Promise

这只是重新的造的轮子，目的是为了理解 `promise` 的内部原理。

目前完成的

1. 基本结构
2. 链式操作


## promise 是什么

`promise` 是种写异步的方法，是之前`callback hell` 的解决方案。

它能把这种:

```
doSth(function(value1){
	
	...
	
	
	
	doAnotherThing(function (value2) {
		
		value1 + value2
		
	})
	
})
```

改成


```

new Promise (function (resolve) {
	
	// 获得 value1
	
	return value1;
	
}).then(function(resolve){
	
	// 获取 value2
	
	return value1 + value2
	
}).then(...)
...

```

这样链式展开下去，避免的回调的嵌套。

## 实现一个简单的 Promise

1. 基本需求分析

	`promise` 的应用场景一般都在异步操作里，要理解它，我们先分析下业务需求，以及 `promise` 之前的处理方法。
	
	首先，分析业务需求，异步操作主要有两步的:
	
	1. 请求数据，
	2. 把得到的数据以回调的方式传出来。

	之前的做法是：
	
	
	```
	// 1. 声明一个回调
	function doSomething(callback) {
		// 执行异步操作，拿到数据result
		callback(result);
	}
	
	// 2. 执行回调
	doSomething(function callback (result) {
		// 拿到结果，执行其他逻辑
	})
	```


	而 `promise` 的做法是：
	
	```
	new Promise(function(resolve){
		// 执行异步操作，拿到数据result
		resolve(result)
	}).then(function callback(result){
		// 拿到结果，执行其他逻辑
	})
	```
	
	可以看出，与之前的做法比， `promise` 的写法：
	
	1. 把请求数据部分放在了 `Promise` 里面
	
	2. 得到的结果通过 `resolve` 传给 `then` 的第一个参数 `callback`
	
	写法变了，**之前通过 `callback` 直接传递结果，现在通过 `resolve`**。
	
2. 初步实现 `then`

	
	我们的目标:
	
	```
	function doSomething() {
	  return new Promise((resolve) => {
	    resolve(42);
	  })
	}
	
	doSomething().then((value) => {
	  console.log(value); // 42
	})
	```
	
	`promise` 实现:
	
	
	```
	class Promise {
	
	  constructor (init) {
	
	    init(this.resolve.bind(this))
	
	  }
	
	  then (callback) {
	    callback(this.value)
	  }
	
	  resolve (value) {
	    this.value = value
	  }
	
	}
	```
	
	基本做的就是:
	
	1. 实例化时传入 `resolve`
	2. 执行 `resolve` 时存储 `value`
	3. 调用 `then` 时，执行 `callback` 时传入 `value`

	上面的要求基本是满足了，但是这基本不可用，因为 `resolve` 一般都在异步里, 我们模仿一下：
	
	
	```
	function doSomething() {
	  return new Promise((resolve) => {
	    setTimeout(() => {
	      resolve(42);
	    })
	  })
	}
	```
	
	这时，返回值是 `undefined`:
	
	```
	doSomething().then((value) => {
	  console.log(value); // 42
	})
	```
	
	分析代码可知，`then` 的 `callback` 是在 `resolve` 之前执行的，也就是说这时的 `value` 还没返回。让我们继续改进：
	
	
	
	
	
	
	



-- 待续 --


