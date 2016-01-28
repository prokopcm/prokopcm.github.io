/// <reference path="../TradeGame.ts" />
/// <reference path="../TypeDefs.d.ts" />

module Trade.UI {
	export class DebugMgr {
		
		game: Trade.Game;
		
		constructor(options: {game: Trade.Game}) {
			this.game = options.game;
			
			// DEBUGGER CRAP
		    window['g_showLocalOrigins'] = localStorage.getItem('g_showLocalOrigins') || false;
		    window['g_showLocalOrigins'] = (g_showLocalOrigins !== "false") ? Boolean(g_showLocalOrigins) : false;
		    if (window['g_showLocalOrigins']) {
		        $('#show-object-origin').prop('checked','checked');
		    }
		    window['g_showObjectScale'] = localStorage.getItem('g_showObjectScale') || false;
		    window['g_showObjectScale'] = (g_showObjectScale !== "false") ? Boolean(g_showObjectScale) : false;
		    if (window['g_showObjectScale']) {
		        $('#show-object-scale').prop('checked','checked');
		    }
		    window['g_showObjectCollisions'] = localStorage.getItem('g_showObjectCollisions') || false;
		    window['g_showObjectCollisions'] = (g_showObjectCollisions !== "false") ? Boolean(g_showObjectCollisions) : false;
		    if (window['g_showObjectCollisions']) {
		        $('#show-object-collisions').prop('checked','checked');
		    }
		    window['g_showShipHeadings'] = localStorage.getItem('g_showShipHeadings') || false;
		    window['g_showShipHeadings'] = (g_showShipHeadings !== "false") ? Boolean(g_showShipHeadings) : false;
		    if (window['g_showShipHeadings']) {
		        $('#show-ship-headings').prop('checked','checked');
		    }
		
		    // debugger crap
		    $('#show-object-origin').on('click', function(e: any) {
		        g_showLocalOrigins = e.target.checked;
		        localStorage.setItem('g_showLocalOrigins', "" + g_showLocalOrigins);
		    });
		
		    $('#show-object-scale').on('click', function(e: any) {
		        g_showObjectScale = e.target.checked;
		        localStorage.setItem('g_showObjectScale', "" + g_showObjectScale);
		    });
		
		    $('#show-object-collisions').on('click', function(e: any) {
		        g_showObjectCollisions = e.target.checked;
		        localStorage.setItem('g_showObjectCollisions', "" + g_showObjectCollisions);
		    });
		
		    $('#show-ship-headings').on('click', function(e: any) {
		        g_showShipHeadings = e.target.checked;
		        localStorage.setItem('g_showShipHeadings', "" + g_showShipHeadings);
		    });
		}
	}
}