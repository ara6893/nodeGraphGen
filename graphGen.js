var fs = require('fs');
var _ = require("underscore");
var cytoscape = require('cytoscape');
var cytosnap = require('cytosnap');
//cytosnap.use([ 'cytoscape-dagre', 'cytoscape-cose-bilkent' ]);
var snap = cytosnap();
var cy = cytoscape();
genGraph(5);
//snap.stop().then(()=>{console.log("closed")});

function genGraph(num){
	console.log(num)
	if(num<0){
		return 1;
	}
	var chars = ['a','b','c','d','e','f','g','h']
	var nodes = [];
	var edges = [];
	var source = genPermutationsSource(chars);
	var target = genPermutationsTarget(source);

	_.each(chars,function(char){
		nodes.push({
			data:{
				id:char
			}
		});
	})

	for(i=0,len = source.length;i<len;i++){
		edges.push({
			data:{
				source:source[i],
				target:target[i]
			}
		})
	}
	_.each(edges,function(edge){
		nodes.push(edge);
	});
	
	snap.start().then(()=>{
		return snap.shot({
			elements:nodes,
			layout:{	
				name:'circle'
			},
			style:[{
				selector:'node',
				style:{
				'background-color':'blue'
			}
			},
			{
				selector:'edge',
				style:{
					'line-color':'red'
			}
			}],
			resolvesTo:'base64',
			format:'png',
			width: 640,
			height: 480,
			background:'transparent'
			});}).then((img)=>{
					fs.writeFile("out"+num+".png", img, 'base64', function(err){
						if(err){
							console.log(err)
						}else{
							return genGraph(num-1);
						}
					})
			});
	

}

function drawGraph(array, num){
	var snap = cytosnap();
	snap.start().then(()=>{
		return snap.shot({
			elements:array,
			layout:{
				name: 'grid'
			},
			style:[{
				selector:'node',
				style:{
				'background-color':'red'
			}
			},
			{
				selector:'edge',
				style:{
					'line-color':'red'
			}
			}],
			resolvesTo:'base64',
			format:'png',
			width: 640,
			height: 480,
			background:'transparent'
			});}).then(async (img)=>{
					await fs.writeFile("out"+num+".png", img, 'base64', function(err){
						if(err){
							console.log(err)
						}
					})
			});
	snap.stop().then(()=>{return;})}

function genPermutationsSource(chars){
	let returnBack = [];
	for(i=0,len = chars.length;i<len;i++){
		var index = Math.floor(Math.random()*chars.length);
		if(returnBack.indexOf(chars[index])==-1){
			returnBack.push(chars[index]);
		}else{
			i--;
		}
	}
	return returnBack;
}
function genPermutationsTarget(chars){
	let returnBack = [];
	for(i=0,len = chars.length;i<len;i++){
		var index = Math.floor(Math.random()*chars.length);
		if(returnBack.indexOf(chars[index])==-1){
			returnBack.push(chars[index]);
		}else{
			i--;
		}
	}
	return returnBack;
}