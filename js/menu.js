var menuAreaHeight = 20;
var menuArea = null;
var menuBackgroundColor = "#105010";
var menuForegroundColor = "Yellow";
var menuWindow = null;

var menuData = [
	{"Window": [
		{"n":"Connect",
		 "a":"javascript:menuConnect();",
		 "e":""},
		{"n":"Triggers",
		 "e":"window.currWin!=null && window.currWin.pb && window.currWin.pb.pb",
		 "a":"javascript:menuTriggers('local');"},
		{"n":"Aliases",
		 "e":"window.currWin!=null && window.currWin.pb && window.currWin.pb.pb",
		 "a":"javascript:menuAliases('local');"},
		{"n":"Scripts",
		 "e":"window.currWin!=null && window.currWin.pb && window.currWin.pb.pb",
		 "a":"javascript:menuScripts('local');"},
		{"n":"Timers",
		 "e":"window.currWin!=null && window.currWin.pb && window.currWin.pb.pb",
		 "a":"javascript:menuTimers('local');"},
		{"n":"Entities",
		 "e":"window.currWin!=null && window.currWin.pb && window.currWin.pb.pb",
		 "a":"javascript:menuEntities('local');"},
		{"n":"Plugins",
		 "e":"window.currWin!=null && window.currWin.pb && window.currWin.pb.pb",
		 "a":"javascript:menuPlugins('local');"},
		{"n":"Capture",
		 "v":"window.isElectron",
		 "e":"window.currWin && window.currWin.wsopened",
		 "a":"javascript:menuCapture();"},
		{"n":"Reconnect",
		 "e":"window.currWin!=null && !window.currWin.wsopened",
		 "a":"javascript:menuReconnect();"},
		{"n":"Disconnect",
		 "e":"window.currWin!=null && window.currWin.wsopened",
		 "a":"javascript:menuDisconnect();"}
	]},
	{"Global Options": [
		{"n":"Windows",
		 "a":"javascript:menuWindows();"},
		{"n":"Triggers",
		 "a":"javascript:menuTriggers('global');"},
		{"n":"Aliases",
		 "a":"javascript:menuAliases('global');"},
		{"n":"Scripts",
		 "a":"javascript:menuScripts('global');"},
		{"n":"Timers",
		 "a":"javascript:menuTimers('global');"},
		{"n":"Entities",
		 "a":"javascript:menuEntities('global');"},
		{"n":"Custom Media",
		 "a":"javascript:menuMedia();"},
		{"n":"Plugins",
		 "a":"javascript:menuPlugins('global');"}
	]},
	{"Help": [
		{"n":"About","a":"javascript:menuAbout()"},
		{"n":"Input",
		 "a":"javascript:menuHelp('Input');"},
		{"n":"Windows",
		 "a":"javascript:menuHelp('Windows');"},
		{"n":"Triggers",
		 "a":"javascript:menuHelp('Triggers');"},
		{"n":"Aliases",
		 "a":"javascript:menuHelp('Aliases');"},
		{"n":"Scripts",
		 "a":"javascript:menuHelp('Scripts');"},
		{"n":"Timers",
		 "a":"javascript:menuHelp('Timers');"},
		{"n":"Entities",
		 "a":"javascript:menuHelp('Entities');"},
		{"n":"Media",
		 "a":"javascript:menuHelp('Media');"},
		{"n":"Plugins",
		 "a":"javascript:menuHelp('Plugins');"}
	]}
];

function configureMenu(obj)
{
	menuArea=obj;
	menuArea.style.position='fixed';
	menuArea.style.top=0;
	menuArea.style.width='100%';
	menuArea.style.height=menuAreaHeight+'px';
	menuArea.style.background=menuBackgroundColor;
	menuArea.style.color=menuForegroundColor;
	
	var html = '';
	html += '<TABLE style="border: 1px solid white; border-collapse: collapse; height: 20px; table-layout: fixed; width: 100%;cursor: pointer;">';
	html +='<TR style="height: 20px;" >';
	for(var to=0;to<menuData.length;to++)
	{
		var topO = menuData[to];
		var topN = Object.keys(topO)[0];
		html += '<TD style="border: 1px solid white; padding: 0;"';
		html += ' ONCLICK="menumenu(this,event,'+to+')" ';
		html += '><FONT COLOR="'+menuForegroundColor+'"><B>&nbsp;&nbsp;';
		html += topN + '</FONT></TD>';
	}
	html += '</TR></TABLE>';
	menuArea.innerHTML = html;
}

function menumenu(obj, e, to) 
{
	nowhidemenu();
	var topO = menuData[to];
	var topN = Object.keys(topO)[0];
	var subList = topO[topN];
	var href='';
	var hint='';
	for(var h=0;h<subList.length;h++)
	{
		var sub=subList[h];
		if(('v' in sub)&&(sub['v'])&&(!eval(sub['v'])))
			continue;
		hint+=sub['n']+'|';
		if(('e' in sub)&&(sub['e'])&&(!eval(sub['e'])))
			href+='|';
		else
			href+=sub['a']+'|';
	}
	var m = dropdownmenu(obj, e, href, hint, prompt, obj.offsetLeft, obj.offsetTop + 20, 200);
	m.style.background = menuBackgroundColor;
	m.style.color = menuForegroundColor;
	var as = Array.from(m.getElementsByTagName("A"));
	for(var a=0;a<as.length;a++)
	{
		as[a].style.color=menuForegroundColor;
		as[a].style.fontSize=16;
		as[a].style.textDecoration = 'none';
	}
	return m;
}

function hideOptionWindow()
{
	if(menuWindow != null)
	{
		menuWindow.style.visibility = 'hidden';
		menuWindow.onclick = function() {};
		var contentWindow = menuWindow.getElementsByTagName('div')[1];
		contentWindow.innerHTML = '';
	}
}

function getOptionWindow(heading, w, h)
{
	if(menuWindow == null)
	{
		menuWindow = document.createElement('div');
		menuWindow.style.cssText = "position:absolute;top:20%;left:10%;height:60%;width:80%;z-index:99;";
		menuWindow.style.cssText += "border-style:solid;border-width:5px;border-color:white;cursor: pointer;";
		menuWindow.style.backgroundColor = 'darkgreen';
		menuWindow.style.visibility = 'visible';
		menuWindow.style.color = 'black';
		document.body.appendChild(menuWindow);
		var titleBar = document.createElement('div');
		titleBar.style.cssText = "position:absolute;top:0%;left:0%;height:20px;width:100%;";
		titleBar.style.backgroundColor = 'white';
		titleBar.style.color = 'black';
		var contentWindow = document.createElement('div');
		contentWindow.style.cssText = "position:absolute;top:20px;left:0%;height:calc(100% - 20px);width:100%;";
		contentWindow.style.backgroundColor = 'lightgray';
		contentWindow.style.color = 'black';
	    contentWindow.style.overflowY = 'auto';
	    contentWindow.style.overflowX = 'hidden';
		menuWindow.appendChild(titleBar);
		menuWindow.appendChild(contentWindow);
	}
	menuWindow.onclick = function() {};
	var titleBar = menuWindow.getElementsByTagName('div')[0];
	var contentWindow = menuWindow.getElementsByTagName('div')[1];
	contentWindow.innerHTML = '';
	menuWindow.style.top = 'calc(' + (((100-h)/2)+'%') + ' - '+inputAreaHeight+'px);';
	menuWindow.style.left = ((100-w)/2)+'%';
	menuWindow.style.height = h+'%';
	menuWindow.style.width = w+'%';
	menuWindow.style.visibility = 'visible';
	titleBar.innerHTML = '<FONT COLOR=BLACK>'+heading+'</FONT>'+
		'<IMG style="float: right; width: 16px; height: 16px;" '
		+'ONCLICK="hideOptionWindow();" '
		+'SRC="images/close.gif">';
	return contentWindow;
}

function menuAbout()
{
	var content = getOptionWindow("About",60,40);
	populateDivFromUrl(content, 'dialogs/about.htm');
	this.menuWindow.onclick = hideOptionWindow;
}

function menuWindows()
{
	var content = getOptionWindow("Window Options",60,40);
	populateDivFromUrl(content, 'dialogs/window.htm');
}

function menuMedia()
{
	var content = getOptionWindow("Custom Media",60,40);
	populateDivFromUrl(content, 'dialogs/media.htm');
}

function menuDisconnect()
{
	if(window.currWin != null)
	{
		window.currWin.closeSocket();
	}
}

function menuReconnect()
{
	if(window.currWin != null)
	{
		window.currWin.closeSocket();
		window.currWin.reset();
		window.currWin.connect(window.currWin.url);
	}
}

function menuConnect()
{
	var content = getOptionWindow("Connect",60,40);
	if(window.isElectron)
		populateDivFromUrl(content, 'dialogs/connecta.htm');
	else
		populateDivFromUrl(content, 'dialogs/connect.htm');
}

function menuTriggers(value)
{
	var which = 'Global';
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		which = window.currWin.pb.name;
	var content = getOptionWindow(which + " Triggers",60,40);
	content.which = value;
	content.triggers = getConfig('/global/triggers', window.defTriggers); // dont parse them
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		content.triggers = window.currWin.localTriggers();
	populateDivFromUrl(content, 'dialogs/triggers.htm');
}

function menuAliases(value)
{
	var which = 'Global';
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		which = window.currWin.pb.name;
	var content = getOptionWindow(which + " Aliases",60,40);
	content.which = value;
	content.aliases = getConfig('/global/aliases', window.defAliases); // dont parse them
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		content.aliases = window.currWin.localAliases();
	populateDivFromUrl(content, 'dialogs/aliases.htm');
}

function menuScripts(value)
{
	var which = 'Global';
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		which = window.currWin.pb.name;
	var content = getOptionWindow(which + " Scripts",60,40);
	content.which = value;
	content.scripts = getConfig('/global/scripts', window.defScripts); // dont parse them
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		content.scripts = window.currWin.localScripts();
	populateDivFromUrl(content, 'dialogs/scripts.htm');
}

function menuPlugins(value)
{
	var which = 'Global';
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		which = window.currWin.pb.name;
	var content = getOptionWindow(which + " Plugins",60,45);
	content.which = value;
	content.plugins = getConfig('/global/plugins', window.defPlugins); // dont parse them
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
	{
		if(!window.currWin.pb.plugins)
			window.currWin.pb.plugins = [];
		content.plugins = JSON.parse(JSON.stringify(window.currWin.pb.plugins));
	}
	populateDivFromUrl(content, 'dialogs/plugins.htm');
}

function menuTimers(value)
{
	var which = 'Global';
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		which = window.currWin.pb.name;
	var content = getOptionWindow(which + " Timers",60,40);
	content.which = value;
	content.timers = getConfig('/global/timers', window.defTimers); // dont parse them
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		content.timers = window.currWin.localTimers();
	populateDivFromUrl(content, 'dialogs/timers.htm');
}

function menuEntities(value)
{
	var which = 'Global';
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		which = window.currWin.pb.name;
	var content = getOptionWindow(which + " Entities (Variables)",60,40);
	content.which = value;
	content.entities = getConfig('/global/entities', window.defEntities); // dont parse them
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		content.entities = window.currWin.mxp.entities;
	content.mxp = getConfig('/global/elements', '');
	if((value != 'global')&&(window.currWin != null)&&(window.currWin.pb))
		content.mxp = window.currWin.pb.elements?window.currWin.pb.elements:'';
	populateDivFromUrl(content, 'dialogs/entities.htm');
}

function menuCapture()
{
	var content = getOptionWindow("Capture Log",60,40);
	content.currWin = window.currWin;
	if(content.currWin)
		populateDivFromUrl(content, 'dialogs/capture.htm');
}

function menuHelp(f)
{
	var addBack = '';
	if((window.menuWindow != null)
	&&(window.menuWindow.style.visibility == 'visible'))
	{
		var titleBar = menuWindow.getElementsByTagName('div')[0];
		var x = titleBar.innerHTML.indexOf('Help ');
		if(x > 0)
		{
			var y = titleBar.innerHTML.indexOf("<",x+1);
			if(y>x)
			{
				addBack = titleBar.innerHTML.substr(x+5,y-(x+5))+'/';
				while(addBack.endsWith(f+'/'))
					addBack = addBack.substr(0,addBack.length-(f.length+1));
			}
		}
	}
	if((f == '<')&&(addBack != ''))
	{
		var parts = addBack.substr(0,addBack.length-1).split('/');
		if(parts.length > 1)
		{
			f=parts[parts.length-2];
			parts.splice(parts.length-2,2);
			addBack=parts.length>0?(parts.join('/')+'/'):'';
		}
		else
		{
			f=parts[0];
			addBack='';
		}
	}
	var content = getOptionWindow("Help "+addBack+f,60,40);
	f = 'help_' + f.toLowerCase() + '.htm';
	populateDivFromUrl(content, 'help/'+f,function(){
		content.lastElementChild.style.cssText = 
			"background-color:black;"
			+"position:absolute;"
			+"color:white;"
			+"font-size:14;"
			+"overflowX:auto;"
			+"overflowY:auto;"
			+"min-height:100%;"
			+"width:100%;"
			+"height: auto;";
		if(addBack != '')
		{
			var bb = document.createElement('img');
			bb.onclick = function(e) { menuHelp('<'); };
			bb.src="images/docback.gif";
			bb.align="right";
			content.lastElementChild.insertBefore(bb,content.lastElementChild.firstChild);
		}
	});
}

document.onkeydown = function(e) {
	if(e.altKey && (e.key == 'o'))
	{
		var win = window.currWin;
		if(window.isElectron && win)
		{
			if(win.logStream != null)
				win.closeLog();
			else
			{
				
				var captureFilename;
				if(win.pb && win.pb.capture)
					captureFilename = win.pb.capture;
				else
				{
					var os = require('os');
					var osPath = require('path');
					captureFilename = osPath.join(os.tmpdir(),Siplet.NAME.toLowerCase()+'.log');
				}
				win.openLog(captureFilename);
			}
		}
	}
};
