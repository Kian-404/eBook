<template>
	<transition name="slide-right">
		<div class="content">
			<div class="content-wrapper" v-if="bookAvailable">
				<div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item)">
					<span class="text">{{item.label}}</span>
				</div>
			</div>
			<div class="empty" v-else>加载中...</div>
		</div>
	</transition>
</template>
<script>
	export default{
		props:{
			ifShowContent:{
				type:Boolean,
				default:false
			},
			navigation:Object,
			bookAvailable:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			jumpTo(item){
				
				 var target = item.href;
				 var index = item.id.slice(2);
				 // console.log(index);
				 // console.log(item);
				 // console.log(target);
				this.$emit('jumpTo', [target, index]);
			}
		}
	}
</script>
<style lang="scss" rel="style/scss" scoped>
	@import '../assets/styles/global.scss';
	.content{
		position: absolute;
		top: 0;
		left: 0;
		// bottom: px2rem(48);
		z-index: 103;
		width: 70%;
		height: 100%;
		background: white;

		.content-wrapper{
			width: 100%;
			height: 100%;
			overflow: auto;
			.content-item{
				padding: px2rem(10) px2rem(15);
				border-bottom: px2rem(1) solid #f4f4f4;
				.text{
					font-size: px2rem(14);
					color: #333;
				}
			}
		}
		.empty{
			width: 100%;
			height: 100%;
			@include center;
			font-size: px2rem(16);
			color:#333;
		}
	}
</style>