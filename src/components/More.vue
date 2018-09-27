<template>
	<div class="more">
		<title-bar :iftitleAndmenuShow="iftitleAndmenuShow"></title-bar>
		<div class="book-wrapper">
				<div class="book-list" v-for="(item, index) in BookList">
				<div class="book-item">
					<div class="book-item-wrapper">
						<router-link :to="{
	            path: '/ebook',     //要跳转的路径
	            params: {        //要传的参数
	                name: item.name,
	                href: item.href
	            },
			          query: {
			            name: item.name, 
			            href:item.href
			        }
				     }" 
	            class="item">
						<img class="pic" width="60" height="80" :src="item.cover" alt="">
						<span class="text">{{item.name}}</span>
						</router-link>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import TitleBar from './TitleBar';
	export default{
		data(){
			return{
				iftitleAndmenuShow:true,
				BookList:[
					{
						name:'MVC的JavaScript_Web富应用开发完整版',
						cover:'../../static/MVC.jpg',
						href:'/static/MVC的JavaScript_Web富应用开发完整版.epub'
					},
					{
						name:'JavaScript高级程序设计第3版',
						cover:'../../static/javascript高程.jpg',
						href:'/static/JavaScript高级程序设计第3版.epub'
					},
					{
						name:'你不知道的JavaScript（上)',
						cover:'../../static/youknow.jpg',
						href:'/static/你不知道的JavaScript（上).epub'
					},
					{
						name:'Go语言编程高清完整版电子书',
						cover:'../../static/go.jpg',
						href:'/static/Go语言编程高清完整版电子书.pdf'
					}
				]
			}
		},
		components:{
			TitleBar
		}
	}
</script>
<style lang="scss" scoped>
@import '../assets/styles/global.scss';
	.more{
		display: flex;
		flex-wrap: wrap;
		.book-wrapper{
			margin-top: px2rem(48);
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.book-list{
				flex:1;
				width: px2rem(100);
				height:px2rem(100);
				padding:px2rem(10);
				margin: px2rem(10);
				max-width: px2rem(85);
				@include center;
				.book-item{

					.book-item-wrapper{

						.item{
								display: flex;
								flex-direction:column;
								text-decoration: none;
								color:#000;
								@include center;
							.pic{
								// @include center;
								padding-bottom: px2rem(10);
							}
							.text{
								font-size: px2rem(10);
							}
						}

					}
				}
			}
		}

	}
</style>