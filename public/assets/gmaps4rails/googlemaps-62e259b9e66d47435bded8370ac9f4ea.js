((function(){var a;a={},a.loadMaps=function(){var b,c,d,e,f;f=[];for(b in a)e=a[b],d=b.search(/load/),d===-1?(c="load_"+b,f.push(a[c]())):f.push(void 0);return f},window.Gmaps=a,this.Gmaps4Rails=function(){function a(){this.map=null,this.visibleInfoWindow=null,this.userLocation=null,this.geolocationFailure=function(){return!1},this.callback=function(){return!1},this.customClusterer=function(){return!1},this.infobox=function(){return!1},this.jsTemplate=!1,this.default_map_options={id:"map",draggable:!0,detect_location:!1,center_on_user:!1,center_latitude:0,center_longitude:0,zoom:7,maxZoom:null,minZoom:null,auto_adjust:!0,auto_zoom:!0,bounds:[],raw:{}},this.default_markers_conf={title:"",picture:"",width:22,length:32,draggable:!1,do_clustering:!0,randomize:!1,max_random_distance:100,list_container:null,offset:0,raw:{}},this.markers=[],this.boundsObject=null,this.polygons=[],this.polylines=[],this.circles=[],this.markerClusterer=null,this.markerImages=[]}return a.prototype.initialize=function(){return this.map=this.createMap(),(this.map_options.detect_location===!0||this.map_options.center_on_user===!0)&&this.findUserLocation(this),this.resetSidebarContent()},a.prototype.findUserLocation=function(a){var b,c;return navigator.geolocation?(c=function(b){a.userLocation=a.createLatLng(b.coords.latitude,b.coords.longitude);if(a.map_options.center_on_user===!0)return a.centerMapOnUser()},b=function(){return a.geolocationFailure(!0)},navigator.geolocation.getCurrentPosition(c,b)):a.geolocationFailure(!1)},a.prototype.create_direction=function(){var a,b,c;return a=new google.maps.DirectionsRenderer,b=new google.maps.DirectionsService,a.setMap(this.map),this.direction_conf.display_panel&&a.setPanel(document.getElementById(this.direction_conf.panel_id)),a.setOptions({suppressMarkers:!1,suppressInfoWindows:!1,suppressPolylines:!1}),c={origin:this.direction_conf.origin,destination:this.direction_conf.destination,waypoints:this.direction_conf.waypoints,optimizeWaypoints:this.direction_conf.optimizeWaypoints,unitSystem:google.maps.DirectionsUnitSystem[this.direction_conf.unitSystem],avoidHighways:this.direction_conf.avoidHighways,avoidTolls:this.direction_conf.avoidTolls,region:this.direction_conf.region,travelMode:google.maps.DirectionsTravelMode[this.direction_conf.travelMode],language:"en"},b.route(c,function(b,c){if(c===google.maps.DirectionsStatus.OK)return a.setDirections(b)})},a.prototype.create_circles=function(){var a,b,c,d,e;d=this.circles,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.create_circle(a));return e},a.prototype.create_circle=function(a){var b;a===this.circles[0]&&(a.strokeColor!=null&&(this.circles_conf.strokeColor=a.strokeColor),a.strokeOpacity!=null&&(this.circles_conf.strokeOpacity=a.strokeOpacity),a.strokeWeight!=null&&(this.circles_conf.strokeWeight=a.strokeWeight),a.fillColor!=null&&(this.circles_conf.fillColor=a.fillColor),a.fillOpacity!=null&&(this.circles_conf.fillOpacity=a.fillOpacity));if(a.lat!=null&&a.lng!=null)return b=new google.maps.Circle({center:this.createLatLng(a.lat,a.lng),strokeColor:a.strokeColor||this.circles_conf.strokeColor,strokeOpacity:a.strokeOpacity||this.circles_conf.strokeOpacity,strokeWeight:a.strokeWeight||this.circles_conf.strokeWeight,fillOpacity:a.fillOpacity||this.circles_conf.fillOpacity,fillColor:a.fillColor||this.circles_conf.fillColor,clickable:a.clickable||this.circles_conf.clickable,zIndex:a.zIndex||this.circles_conf.zIndex,radius:a.radius}),a.serviceObject=b,b.setMap(this.map)},a.prototype.clear_circles=function(){var a,b,c,d,e;d=this.circles,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.clear_circle(a));return e},a.prototype.clear_circle=function(a){return a.serviceObject.setMap(null)},a.prototype.hide_circles=function(){var a,b,c,d,e;d=this.circles,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.hide_circle(a));return e},a.prototype.hide_circle=function(a){return a.serviceObject.setMap(null)},a.prototype.show_circles=function(){var a,b,c,d,e;d=this.circles,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.show_circle(this.circle));return e},a.prototype.show_circle=function(a){return a.serviceObject.setMap(this.map)},a.prototype.create_polygons=function(){var a,b,c,d,e;d=this.polygons,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.create_polygon(a));return e},a.prototype.create_polygon=function(a){var b,c,d,e,f,g,h,i,j,k,l;g=[];for(k=0,l=a.length;k<l;k++)f=a[k],d=this.createLatLng(f.lat,f.lng),g.push(d),f===a[0]&&(h=f.strokeColor||this.polygons_conf.strokeColor,i=f.strokeOpacity||this.polygons_conf.strokeOpacity,j=f.strokeWeight||this.polygons_conf.strokeWeight,b=f.fillColor||this.polygons_conf.fillColor,c=f.fillOpacity||this.polygons_conf.fillOpacity);return e=new google.maps.Polygon({paths:g,strokeColor:h,strokeOpacity:i,strokeWeight:j,fillColor:b,fillOpacity:c,clickable:!1}),a.serviceObject=e,e.setMap(this.map)},a.prototype.create_polylines=function(){var a,b,c,d,e;d=this.polylines,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.create_polyline(a));return e},a.prototype.create_polyline=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o;g=[];for(k=0,m=a.length;k<m;k++){c=a[k];if(c.coded_array!=null){b=new google.maps.geometry.encoding.decodePath(c.coded_array),o=b.length;for(l=0,n=o.length;l<n;l++)f=o[l],g.push(f),g.push(f)}else c===a[0]&&(h=c.strokeColor||this.polylines_conf.strokeColor,i=c.strokeOpacity||this.polylines_conf.strokeOpacity,j=c.strokeWeight||this.polylines_conf.strokeWeight),c.lat!=null&&c.lng!=null&&(d=this.createLatLng(c.lat,c.lng),g.push(d))}return e=new google.maps.Polyline({path:g,strokeColor:h,strokeOpacity:i,strokeWeight:j,clickable:!1}),a.serviceObject=e,e.setMap(this.map)},a.prototype.create_markers=function(){return this.createServiceMarkersFromMarkers(),this.clusterize()},a.prototype.createServiceMarkersFromMarkers=function(){var a,b,c,d,e,f,g;g=this.markers;for(d=0,f=g.length;d<f;d++)e=g[d],a=this.markers[d].lat,c=this.markers[d].lng,this.markers_conf.randomize&&(b=this.randomize(a,c),a=b[0],c=b[1]),this.markers[d].serviceObject=this.createMarker({marker_picture:this.markers[d].picture?this.markers[d].picture:this.markers_conf.picture,marker_width:this.markers[d].width?this.markers[d].width:this.markers_conf.width,marker_height:this.markers[d].height?this.markers[d].height:this.markers_conf.length,marker_title:this.markers[d].title?this.markers[d].title:null,marker_anchor:this.markers[d].marker_anchor?this.markers[d].marker_anchor:null,shadow_anchor:this.markers[d].shadow_anchor?this.markers[d].shadow_anchor:null,shadow_picture:this.markers[d].shadow_picture?this.markers[d].shadow_picture:null,shadow_width:this.markers[d].shadow_width?this.markers[d].shadow_width:null,shadow_height:this.markers[d].shadow_height?this.markers[d].shadow_height:null,marker_draggable:this.markers[d].draggable?this.markers[d].draggable:this.markers_conf.draggable,rich_marker:this.markers[d].rich_marker?this.markers[d].rich_marker:null,Lat:a,Lng:c,index:d}),this.createInfoWindow(this.markers[d]),this.createSidebar(this.markers[d]);return this.markers_conf.offset=this.markers.length},a.prototype.createImageAnchorPosition=function(a){return a===null?null:this.createPoint(a[0],a[1])},a.prototype.replaceMarkers=function(a){return this.clearMarkers(),this.markers=new Array,this.boundsObject=this.createLatLngBounds(),this.resetSidebarContent(),this.markers_conf.offset=0,this.addMarkers(a)},a.prototype.addMarkers=function(a){return this.markers=this.markers.concat(a),this.create_markers(),this.adjustMapToBounds()},a.prototype.createSidebar=function(a){var b,c,d,e,f;if(this.markers_conf.list_container)return f=document.getElementById(this.markers_conf.list_container),e=document.createElement("li"),b=document.createElement("a"),b.href="javascript:void(0);",d=a.sidebar!=null?a.sidebar:"Marker",b.innerHTML=d,c=this,b.onclick=this.sidebar_element_handler(c,a.serviceObject,"click"),e.appendChild(b),f.appendChild(e)},a.prototype.sidebar_element_handler=function(a,b,c){return function(){return a.map.panTo(b.position),google.maps.event.trigger(b,c)}},a.prototype.resetSidebarContent=function(){var a;if(this.markers_conf.list_container!==null)return a=document.getElementById(this.markers_conf.list_container),a.innerHTML=""},a.prototype.adjustMapToBounds=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x;if(this.map_options.auto_adjust||this.map_options.bounds!==null)this.boundsObject=this.createLatLngBounds();if(this.map_options.auto_adjust){this.extendBoundsWithMarkers(),u=this.polylines;for(i=0,m=u.length;i<m;i++){g=u[i],h=g.serviceObject.latLngs.getArray()[0].getArray();for(j=0,n=h.length;j<n;j++)d=h[j],this.boundsObject.extend(d)}v=this.polygons;for(k=0,o=v.length;k<o;k++){e=v[k],f=e.serviceObject.latLngs.getArray()[0].getArray();for(l=0,p=f.length;l<p;l++)d=f[l],this.boundsObject.extend(d)}w=this.circles;for(s=0,q=w.length;s<q;s++)b=w[s],this.boundsObject.extend(b.serviceObject.getBounds().getNorthEast()),this.boundsObject.extend(b.serviceObject.getBounds().getSouthWest())}x=this.map_options.bounds;for(t=0,r=x.length;t<r;t++)a=x[t],a=this.createLatLng(a.lat,a.lng),this.boundsObject.extend(a);if(this.map_options.auto_adjust||this.map_options.bounds.length>0)return this.map_options.auto_zoom?this.fitBounds():(c=this.boundsObject.getCenter(),this.map_options.center_latitude=c.lat(),this.map_options.center_longitude=c.lng(),this.map.setCenter(c))},a.prototype.create_kml=function(){var a,b,c,d,e;d=this.kml,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(a.serviceObject=this.createKmlLayer(a));return e},a.prototype.exists=function(a){return a!==""&&typeof a!="undefined"},a.prototype.randomize=function(a,b){var c,d,e,f;return e=this.markers_conf.max_random_distance*this.random(),f=this.markers_conf.max_random_distance*this.random(),c=parseFloat(a)+180/Math.PI*(f/6378137),d=parseFloat(b)+90/Math.PI*(e/6378137)/Math.cos(a),[c,d]},a.prototype.mergeObjectWithDefault=function(a,b){var c,d,e;c={};for(d in a)e=a[d],c[d]=e;for(d in b)e=b[d],c[d]==null&&(c[d]=e);return c},a.prototype.mergeWithDefault=function(a){var b,c;return b=this["default_"+a],c=this[a],this[a]=this.mergeObjectWithDefault(c,b),!0},a.prototype.random=function(){return Math.random()*2-1},a}()})).call(this),function(){var a=Object.prototype.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};this.Gmaps4RailsGoogle=function(){function a(){a.__super__.constructor.apply(this,arguments),this.map_options={disableDefaultUI:!1,disableDoubleClickZoom:!1,type:"ROADMAP"},this.markers_conf={clusterer_gridSize:50,clusterer_maxZoom:5,custom_cluster_pictures:null,custom_infowindow_class:null},this.mergeWithDefault("map_options"),this.mergeWithDefault("markers_conf"),this.kml_options={clickable:!0,preserveViewport:!1,suppressInfoWindows:!1},this.polygons_conf={strokeColor:"#FFAA00",strokeOpacity:.8,strokeWeight:2,fillColor:"#000000",fillOpacity:.35},this.polylines_conf={strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2},this.circles_conf={fillColor:"#00AAFF",fillOpacity:.35,strokeColor:"#FFAA00",strokeOpacity:.8,strokeWeight:2,clickable:!1,zIndex:null},this.direction_conf={panel_id:null,display_panel:!1,origin:null,destination:null,waypoints:[],optimizeWaypoints:!1,unitSystem:"METRIC",avoidHighways:!1,avoidTolls:!1,region:null,travelMode:"DRIVING"}}return b(a,Gmaps4Rails),a.prototype.createPoint=function(a,b){return new google.maps.Point(a,b)},a.prototype.createLatLng=function(a,b){return new google.maps.LatLng(a,b)},a.prototype.createLatLngBounds=function(){return new google.maps.LatLngBounds},a.prototype.createMap=function(){var a,b;return a={maxZoom:this.map_options.maxZoom,minZoom:this.map_options.minZoom,zoom:this.map_options.zoom,center:this.createLatLng(this.map_options.center_latitude,this.map_options.center_longitude),mapTypeId:google.maps.MapTypeId[this.map_options.type],mapTypeControl:this.map_options.mapTypeControl,disableDefaultUI:this.map_options.disableDefaultUI,disableDoubleClickZoom:this.map_options.disableDoubleClickZoom,draggable:this.map_options.draggable},b=this.mergeObjectWithDefault(this.map_options.raw,a),new google.maps.Map(document.getElementById(this.map_options.id),b)},a.prototype.createMarkerImage=function(a,b,c,d,e){return new google.maps.MarkerImage(a,b,c,d,e)},a.prototype.createSize=function(a,b){return new google.maps.Size(a,b)},a.prototype.createMarker=function(a){var b,c,d,e,f,g,h;return e=this.createLatLng(a.Lat,a.Lng),a.marker_picture===""&&a.rich_marker===null?(b={position:e,map:this.map,title:a.marker_title,draggable:a.marker_draggable},f=this.mergeObjectWithDefault(this.markers_conf.raw,b),new google.maps.Marker(f)):a.rich_marker!==null?new RichMarker({position:e,map:this.map,draggable:a.marker_draggable,content:a.rich_marker,flat:a.marker_anchor===null?!1:a.marker_anchor[1],anchor:a.marker_anchor===null?0:a.marker_anchor[0]}):(c=this.createImageAnchorPosition(a.marker_anchor),g=this.createImageAnchorPosition(a.shadow_anchor),d=this.createOrRetrieveImage(a.marker_picture,a.marker_width,a.marker_height,c),h=this.createOrRetrieveImage(a.shadow_picture,a.shadow_width,a.shadow_height,g),b={position:e,map:this.map,icon:d,title:a.marker_title,draggable:a.marker_draggable,shadow:h},f=this.mergeObjectWithDefault(this.markers_conf.raw,b),new google.maps.Marker(f))},a.prototype.includeMarkerImage=function(a,b){var c,d,e;for(c=0,e=a.length;c<e;c++){d=a[c];if(d.url===b)return c}return!1},a.prototype.createOrRetrieveImage=function(a,b,c,d){var e,f;if(a===""||a===null)return null;f=this.includeMarkerImage(this.markerImages,a);switch(f){case!1:return e=this.createMarkerImage(a,this.createSize(b,c),null,d,null),this.markerImages.push(e),e;default:if(typeof f=="number")return this.markerImages[f];return!1}},a.prototype.clearMarkers=function(){var a,b,c,d,e;d=this.markers,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.clearMarker(a));return e},a.prototype.showMarkers=function(){var a,b,c,d,e;d=this.markers,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.showMarker(a));return e},a.prototype.hideMarkers=function(){var a,b,c,d,e;d=this.markers,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.hideMarker(a));return e},a.prototype.clearMarker=function(a){return console.log(a),a.serviceObject.setMap(null)},a.prototype.showMarker=function(a){return a.serviceObject.setVisible(!0)},a.prototype.hideMarker=function(a){return a.serviceObject.setVisible(!1)},a.prototype.extendBoundsWithMarkers=function(){var a,b,c,d,e;d=this.markers,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.boundsObject.extend(a.serviceObject.position));return e},a.prototype.createClusterer=function(a){return new MarkerClusterer(this.map,a,{maxZoom:this.markers_conf.clusterer_maxZoom,gridSize:this.markers_conf.clusterer_gridSize,styles:this.customClusterer()})},a.prototype.clearClusterer=function(){return this.markerClusterer.clearMarkers()},a.prototype.clusterize=function(){var a,b,c,d,e;if(this.markers_conf.do_clustering===!0){this.markerClusterer!==null&&this.clearClusterer(),b=new Array,e=this.markers;for(c=0,d=e.length;c<d;c++)a=e[c],b.push(a.serviceObject);return this.markerClusterer=this.createClusterer(b)}},a.prototype.createInfoWindow=function(a){var b,c;if(typeof this.jsTemplate=="function"||a.description!=null)return typeof this.jsTemplate=="function"&&(a.description=this.jsTemplate(a)),this.markers_conf.custom_infowindow_class!==null?(b=document.createElement("div"),b.setAttribute("class",this.markers_conf.custom_infowindow_class),b.innerHTML=a.description,a.infowindow=new InfoBox(this.infobox(b)),c=this,google.maps.event.addListener(a.serviceObject,"click",this.openInfoWindow(c,a.infowindow,a.serviceObject))):(a.infowindow=new google.maps.InfoWindow({content:a.description}),c=this,google.maps.event.addListener(a.serviceObject,"click",this.openInfoWindow(c,a.infowindow,a.serviceObject)))},a.prototype.openInfoWindow=function(a,b,c){return function(){return a.visibleInfoWindow!==null&&a.visibleInfoWindow.close(),b.open(a.map,c),a.visibleInfoWindow=b}},a.prototype.createKmlLayer=function(a){var b;return b=a.options||{},b=this.mergeObjectWithDefault(b,this.kml_options),a=new google.maps.KmlLayer(a.url,b),a.setMap(this.map),a},a.prototype.fitBounds=function(){return this.map.fitBounds(this.boundsObject)},a.prototype.centerMapOnUser=function(){return this.map.setCenter(this.userLocation)},a}()}.call(this)