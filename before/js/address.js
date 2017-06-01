new Vue({

	el: ".container",

	data:{

		limitNum: 3,
		addressList:[],
		curIndex:0,
		shippingMethod:1,
		delflag:false,
		curAddress:'',

		isModAddress:false,
		modName:'',
		modStreetAddress:'',
		modTel:'',
		modAddId:''

	},

	mounted: function(){

		this.$nextTick(function(){

			this.getAddressList();
		});
	},

	computed: {

		filterAddress: function(){

			return this.addressList.slice(0,this.limitNum);
		}
	},

	methods:{

		getAddressList:function(){

			_this = this;

			this.$http.get("data/address.json").then(function(response){

				var res = response.data;

				if(res.status == 0){

					_this.addressList = res.result;
				}
			});
		},

		loadMore: function(){

			this.limitNum=this.addressList.length;
		},

		setDefault: function(addressId){

			this.addressList.forEach(function(address,index){

				if(address.addressId == addressId){

					address.isDefault = true;

				}else{

					address.isDefault = false;
				}
			})
		},

		delAddressConfirm:function(item){

			this.delflag = true;

			this.curAddress = item;
		},

		delAddress: function(){

			var index = this.addressList.indexOf(this.curAddress);//模拟数组删除，实际应该往后台传递参数，从数据库中删除

			this.addressList.splice(index,1);

			this.delflag = false;

		},

		//修改地址
		modAddress:function(item){

			this.delflag = true;

			this.modAddId = item.addressId;

			this.modName = item.userName;

			this.modStreetAddress = item.streetName;

			this.modTel = item.tel;
		},

		//确认修改地址
		sureModAdd:function(addressId){

			this.delflag = false;

			this.addressList.forEach((item,index)=>{//es6

				if(item.addressId == addressId){

					item.userName = this.modName;

					item.streetName = this.modStreetAddress;

					item.tel = this.modTel;
				}
			});
		}
	}
})