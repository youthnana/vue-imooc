new Vue({

	el: "#app",

	data: {
		totalMoney: 0,
		productList: []
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
		}
	}
});

//全局过滤器
Vue.filter("money",function(value,_type){

	return "￥" + value.toFixed(2) + _type;
})