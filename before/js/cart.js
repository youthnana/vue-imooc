new Vue({

	el: "#app",

	data: {
		totalMoney: 0,
		totalPrice:0,
		productList: [],
		checkAllFlag: false,
		delFlag: false,
		curProduct:''
	},

	filters: {

		formatMoney: function(value){

			return "￥" + value.toFixed(2);
		}
	},
	mounted: function(){

		this.$nextTick(function(){

			this.cartView();//you can use vm.cartView() if you write var vm = new Vue({});

		})
		
	},

	methods: {

		cartView: function(){

			var _this = this;

			this.$http.get("data/cartData.json",{'id': 123}).then(function(res){

				_this.productList = res.data.result.list;

				_this.totalMoney = res.data.result.totalMoney;

			});
		},

		changeMoney:function(product,way){

			if( way > 0){

				product.productQuantity++;

			}else{

				product.productQuantity--;

				if(product.productQuantity < 1){

					product.productQuantity = 1;
				}

			}
			this.calcTotalPrice();//增加数量计算
		},

		selectProduct: function(item){

			if(typeof item.checked == "undefined"){

				Vue.set(item,"checked",true);//全局往item中添加了一个checked属性

				// this.$set(item,"checked",true);
			}else{

				item.checked = !item.checked;
			}

			this.calcTotalPrice();//单选计算
		},

		checkAll: function(flag){

			this.checkAllFlag = flag;

			var _this = this;

			this.productList.forEach(function(value,index){//forEach遍历列表

				if(typeof value.checked == 'undefined'){

					_this.$set(value,'checked',_this.checkAllFlag);

				}else{

					value.checked = _this.checkAllFlag;
				}
			});

			this.calcTotalPrice();//多选计算

		},

		calcTotalPrice: function(){

			var _this = this;

			_this.totalPrice = 0;//每次计算清空，不然会累加

			this.productList.forEach(function(value,index){

				if(value.checked){

					_this.totalPrice += value.productPrice*value.productQuantity;
				}
			})
		},

		delConfirm: function(item){

			this.delFlag = true;

			this.curProduct = item;
		},

		delProduct: function(){

			var index = this.productList.indexOf(this.curProduct);//模拟数组删除，实际应该往后台传递参数，从数据库中删除

			this.productList.splice(index,1);

			this.delFlag = false;

		}
	}
});

//全局过滤器
Vue.filter("money",function(value,_type){

	return "￥" + value.toFixed(2) + _type;
})