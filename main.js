"use strict";

require.config({
    waitSeconds: 0,

    shim: {
    	 handlebars: {
                exports: 'Handlebars'
         }
    },

    paths: {
    	jquery: '//localhost:8080/dashboard2/lib/js/jquery-3.1.1.min',
        handlebars: '//localhost:8080/dashboard2/lib/js/handlebars.min',
        text: '//localhost:8080/dashboard2/lib/js/text',
        mcustomscrollbar: '//localhost:8080/dashboard2/lib/js/jquery.mCustomScrollbar.concat.min',
        chart:'//localhost:8080/dashboard2/lib/js/chart',
        moment: '//localhost:8080/dashboard2/lib/js/moment',
        mousewheel: '//localhost:8080/dashboard2/lib/js/mousewheel',
    }
});


require([
	'jquery',
	'handlebars',
	'mcustomscrollbar',
	'chart',
	'moment',
	'mousewheel',
	'helpers/register_helpers',
	'text!partials/sidebar.html',
	'text!partials/review_template.html',
	'text!partials/sentiments_template.html'
	],function($, Handlebars, mCustomScrollbar, chart, Moment, Mousewheel, RegisterHelpers, Sidebar, reviewTemplate, sentimentsTemplate){

	var some_data;
	/*console.log(Handlebars);*/
	

	var prev_this = this;

	var $BODY = $('body'),
	    $SIDEBAR_MENU = $('#sidebar-menu'),
	    $LEFT_COL = $('.left_col'),
	    $RIGHT_COL = $('.right_col'); 

	$(document).ready(function(){
	    some_data = $.parseJSON(jsonData);
		//function for rendering sidebar
		var common_obj = {"common":[]};
		this.arr_sidebar = [];
		for(var i=0;i<some_data.features_data.length;i++){ 
			this.arr_sidebar.push(some_data.features_data[i].name);
			common_obj["common"].push({"name": some_data.features_data[i].name, "avg_rating":some_data.features_data[i].avg_rating});
		}
	
		var sidebar_template = Handlebars.compile(Sidebar);
		$('.statistic').html(sidebar_template({
			'sidebar': this.arr_sidebar
		}));
		
		$SIDEBAR_MENU.find('a').on('click', function(ev) {
	        var $li = $(this).parent();

	        if ($li.is('.active')) {
	            $li.removeClass('active active-sm');
	            $('ul:first', $li).slideUp(function() {
	                //setContentHeight();
	            });
	        } else {
	            // prevent closing menu if we are on child menu
	            if (!$li.parent().is('.child_menu')) {
	                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
	                $SIDEBAR_MENU.find('li ul').slideUp();
	            }
	            
	            $li.addClass('active');

	            $('ul:first', $li).slideDown(function() {
	                //setContentHeight();
	            });
	        }
	    });

	    if ($.fn.mCustomScrollbar) {
	        $('.menu_fixed').mCustomScrollbar({
	            autoHideScrollbar: true,
	            theme: 'minimal',
	            mouseWheel:{ preventDefault: true }
	        });
	    }

	    setContentHeight();
	    chartController(some_data);
	    
	    renderReviewSection(some_data);
	    renderSentiments(some_data);

	});

	var renderSentiments = function(some_data){
		var sentiments_template = Handlebars.compile(sentimentsTemplate),
			data = some_data.features_data; 

		$('.sentiments').html(sentiments_template({
			'sentiments':data
		}));

		renderSentiCharts(data);
	};

	var renderReviewSection = function(some_data){
		var review_template = Handlebars.compile(reviewTemplate),
			data= some_data.source_wise_stats;

		$('.review-section').html(review_template({
			'stat': data
		}))

		renderReviewCharts(data);
	};	

	var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = 0,
            leftColHeight = $LEFT_COL.eq(1).height() + 0,
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= 0 + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };


	

	var handlesidebar = function(some_data, arr_sidebar){
		$('.select-items').on('click', function(){
			var id = this.id;

			if(id === 'select-0'){
				renderAllCategory(some_data);
			}else{
				for(var i=0;i<some_data.features_data.length;i++){
					if(some_data.features_data[i].name == arr_sidebar[id]){
						 var pos_review = some_data.features_data[i].positive_samples;
						 var neg_review = some_data.features_data[i].negative_samples;
					}
				}

				var common_template = Handlebars.compile(commonTemplate);

				$('.review-main-main').html(common_template({
					'recent_postive': pos_review,
					'recent_negative': neg_review
				}))
				customscrollbar();
			}

			$('.select-items').removeClass('select-selected');
			$(this).addClass('select-selected');
			$('#review-all, #review-positive, #review-negative').removeClass('review-header-items-selected');
			$('#review-all').addClass('review-header-items-selected');

			$('.review-main-main').mCustomScrollbar({
				theme: "dark",
		        scrollButtons: {
		            enable: true
		        }
			});
		});
	};

	var chartController = function(some_data){
		var canvas = document.querySelector('canvas'),
		    ctx    = $("#myChart"),
		    c_labels = [],
			c_data = [] ;

		for(var i=0;i<some_data.time_wise_NPS_stats.length;i++){
			c_labels.push(some_data.time_wise_NPS_stats[i].time);
			c_data.push(some_data.time_wise_NPS_stats[i].nps_score);
		};

		fitToContainer(canvas);

		chartPlotter(c_labels, c_data, ctx);
	};

	var chartPlotter = function(c_labels, c_data, ctx){
		var  data = {
			labels: c_labels,
			datasets: [
				{
					/*fillColor: "rgb(206, 243, 252)",
			        strokeColor: "rgba(220,180,0,1)",
			        pointColor: "rgba(220,180,0,1)",*/
			        backgroundColor: "rgba(34, 43, 165,0.4)",
            		borderColor: "rgba(34, 43, 165,1)",
			        data: c_data,
			        lineTension: 0,
				}
			]
		},			 
			 options = {
			 	responsive:true,
			 	legend:{
			 		display:false
			 	},

			 	scales: {
				    xAxes: [{
				    			stepSize: 5,
				                gridLines: {
				                    display : false
				                }
				            }],
				    yAxes: [{
				    			ticks: {
									suggestedMin: -120,
									suggestedMax: 120    
	                            },
				                gridLines: {
				                   display:true,
				                }   
				            }]
				    }
			 };
		var myLineChart = new Chart(ctx , {
			type: "line",
			data: data,
			options: options
		});	
	};

	function fitToContainer(canvas){
	  canvas.style.width='100%';
	  canvas.style.height='100%';
	  canvas.width  = canvas.offsetWidth;
	  canvas.height = canvas.offsetHeight;
	};

	var renderReviewCharts = function(some_data){
		for(var i=0;i<some_data.length;i++){
			var  id="#reviewchart-"+i,
				 ctx    = $(id).get(0).getContext("2d"),
				 pieData = {
				        labels:[
				        	'white',
				        	'blue'
				        ],
				        datasets:[
				        	{
				        		data: [some_data[i].source_rating,5-some_data[i].source_rating],	
				        		backgroundColor:[
				        			"#25a6bc",
				        			"#a2b0b2"
				        		]
				        	}]
				      },

				options={
					cutoutPercentage: 80,
					responsive:true,
				 	legend:{
				 		display:false
				 	}
				};

			var myPieChart = new Chart(ctx,{
			    type: 'doughnut',
			    data: pieData,
			    options: options
			});
		}
		
	}

	var renderSentiCharts = function(some_data){
		for(var i=0;i<some_data.length;i++){
			var  id="#sentichart-"+i,
				 ctx    = $(id).get(0).getContext("2d"),
				 pieData = {
				        labels:[
				        	'white',
				        	'blue'
				        ],
				        datasets:[
				        	{
				        		data: [some_data[i].avg_rating,10-some_data[i].avg_rating],	
				        		backgroundColor:[
				        			"#25a6bc",
				        			"#a2b0b2"
				        		]
				        	}]
				      },

				options={
					cutoutPercentage: 80,
					responsive:true,
				 	legend:{
				 		display:false
				 	}
				};

			var myPieChart = new Chart(ctx,{
			    type: 'doughnut',
			    data: pieData,
			    options: options
			});
		}
		
	}

});



