<template>
  <div class="ebook">
  	<title-bar :iftitleAndmenuShow="iftitleAndmenuShow"></title-bar>
		<div class="read-wrapper">
			<div id="read">
				<v-touch @swipeleft="nextPage" @swiperight="prevPage" >
				<div class="mask">
					
						<div class="left"  @click="prevPage"></div>
						<div class="center" @click="toggleTitleAndMenu"></div>
						<div class="right" @click="nextPage"></div>
					
				</div>
				</v-touch>
			</div>
		</div>
		<menu-bar ref="menuBar"
		 :iftitleAndmenuShow="iftitleAndmenuShow"
		 :fontSizeList="fontSizeList"
		 :defaultFontSize="defaultFontSize"
		 @setFontSize="setFontSize"
		 :themeList="themeList"
		 :defaultTheme="defaultTheme"
		 @setTheme="setTheme"
		 :bookAvailable="bookAvailable"
		 @onProgressChange="onProgressChange"
		 :navigation="navigation"
		 @jumpTo="jumpTo"
		 ></menu-bar>
	</div>
</template>
<script>
	import TitleBar from '@/components/TitleBar';
	import MenuBar from '@/components/MenuBar';
	import Epub from 'epubjs';
	// import './assets/js/move.js'
	const DOWNLOAD_URL = '/static/MVC的JavaScript_Web富应用开发完整版.epub'
	global.epub = Epub;
	/* eslint-disable */
	export default{
		data(){
			return{
				iftitleAndmenuShow:false,
				fontSizeList:[
					{fontSize: 12},
					{fontSize: 14},
					{fontSize: 16},
					{fontSize: 18},
					{fontSize: 20},
					{fontSize: 22},
					{fontSize: 24}
				],
				defaultFontSize:16,
				themeList:[
					{
						name:'default',
						style:{
							body:{
								color:'#000',
								background:'#fff'
							}
						}
					},
					{
						name:'eye',
						style:{
							body:{
								color:'#000',
								background:'#d2eebd'
							}
						}
					},
					{
						name:'night',
						style:{
							body:{
								color:'#fff',
								background:'#000'
							}
						}
					},
					{
						name:'gold',
						style:{
							body:{
								color:'#000',
								background:'rgb(241, 236, 226)'
							}
						}
					}
				],
				defaultTheme:0,
				//图书是否处于可用状态
				bookAvailable:false,
				navigation:{}
			}
		},
		created(){
			var href = this.$route.query.href;
			console.log(href);
			this.showEpub(href);
		},
		methods:{
			//根据链接跳转到指定的位置
			jumpTo(args){
				console.log(args[0][0]);
				var href = args[0][0];
				var index = args[0][1];
				console.log(arguments);
				this.rendition.display(href);
				this.hidetitleAndmenu();
				var ListLength = this.navigation.length;
				console.log(index);
				console.log(ListLength);
				var progress = Math.round((0 + index) / ListLength*100);
				console.log(progress);
				// this.onProgressChange(progress);
				this.$refs.menuBar.onProgressInput(progress);
			},
			hidetitleAndmenu(){
				this.iftitleAndmenuShow = false;
				this.$refs.menuBar.hideSetting();
				this.$refs.menuBar.hideContent();
			},
			onProgressChange(progress){
				//progress 进度条的数值（0-100）
				const percentage = progress / 100;
				const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
				this.rendition.display(location);
			},
			setTheme(index){
				this.themes.select(this.themeList[index].name);
				this.defaultTheme = index;
			},
			registerTheme(){
				this.themeList.forEach(theme=>{
					this.themes.register(theme.name, theme.style)
				})
			},
			setFontSize(fontSize){
				this.defaultFontSize = fontSize;
				if(this.themes){
					this.themes.fontSize(fontSize + 'px');
				}
			},
			toggleTitleAndMenu(){
				this.iftitleAndmenuShow = !this.iftitleAndmenuShow;
				if(! this.iftitleAndmenuShow){
					this.$refs.menuBar.hideSetting();
				}
			},
			prevPage(){
				//rendtion.prev
				if(this.rendition){
					this.rendition.prev();
				}

			},
			nextPage(){
				if(this.rendition){
					this.rendition.next();
				}
			},
			//电子书的解析与渲染
			showEpub(href){
				//生成book
				this.book = new Epub(href);
				console.log(this.book);
				//生成rendtion
				this.rendition = this.book.renderTo('read', {
					width: window.innerWidth,
					height: window.innnerHeight
				})
				//通过rendtion.display渲染电子书
				this.rendition.display();
				//获取theme对象
				this.themes = this.rendition.themes;
				//设置默认字体
				this.setFontSize(this.defaultFontSize);
				//this.themes.register(name, styles)
				//this.themes.select(name)
				this.registerTheme();
				this.setTheme(this.defaultTheme);

				//获取locations对象
				//通过epub的钩子函数实现
				this.book.ready.then(() =>{
					this.navigation = this.book.navigation;
					console.log(this.navigation);
					return this.book.locations.generate();
				}).then(result=>{
					this.locations = this.book.locations;
					this.bookAvailable = true;
				})
			}
		},
		components:{
			TitleBar,
			MenuBar
		}
	}
</script>
<style lang="scss" scoped>
	@import 'assets/styles/global.scss';
	.ebook{
		
		.read-wrapper{
			.mask{
				position: absolute;
				top: 0;
				left: 0;
				z-index: 100;
				width: 100%;
				height: 100%;
				// background: red;
				display: flex;
				.left{
					flex: 0 0 px2rem(100);
					// background: yellow;
				}
				.center{
					flex:1;
				}
				.right{
					flex:0 0 px2rem(100);
					// background: blue;
				}
			}
		}


	}

</style>