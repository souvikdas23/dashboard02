<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FeltSo - Task</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
<script src="main.js" type="text/javascript"></script> -->
<link href="css/style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.css">
<script type="text/javascript">
  var jsonData = <?php echo $a_data; ?>;
</script>
<body class="nav-md">
  <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view" style="width: 248px;">
          <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">
                  <li><a><i class="fa fa-dashboard"></i> Dashboard <span class="fa fa-chevron-down"></span></a>
                  </li>
                  <li><a><i class="fa fa-area-chart"></i> Statistic <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu statistic">                    
                    </ul>
                  </li>
                  <li><a><i class="fa fa-list-alt"></i> Competitors<span class="fa fa-chevron-down"></span></a>
                  </li>
                  <li><a><i class="fa  fa-folder-open-o"></i> Other <span class="fa fa-chevron-down"></span></a>
                  </li>
                </ul>
              </div>
            </div>
          <!-- /sidebar menu -->        
        </div> 
    </div>

    <div class="right_col" role="main">
        <div class="page-title">
            <div class="title_left">
              <h3> Hotel Chandrika </h3>
            </div>
        </div>

        <hr style="margin-top: 0px;">

        <div class="clearfix"></div>
        <div class="row">
          <div class="col-md-12">
              <div class="x_panel">
                  <div class="x_title">
                    <h2>NPS Over Time <i class="fa fa-question-circle"></i> </h2>          
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <div class="row">  
                      <div class="col-md-8 chart-container">
                        <canvas id="myChart" style="width:100%; height:100%;"></canvas>
                      </div>

                      <div class="col-md-4">
                        <div class="x_title">
                          <h4>Top Review Sources</h4>          
                          <div class="clearfix"></div>
                        </div>
                        <div class="review-section">
                          
                        </div>
                      </div>                
                    </div>
                  </div>
              </div>
          </div>
          
        </div>

        <div class="clearfix"></div>
        <div class="x_title">
          <h2>Sentiment Categories <i class="fa fa-question-circle"></i> </h2>          
          <div class="clearfix"></div>
        </div>

        <div class="container sentiments">
          <!-- <div class="col-md-3">
            <h5><i class="fa fa-star"></i>&nbsp&nbspRestaurant General</h5>
            <div class="clearfix"></div>
              <span class="collection_rev">
                <p style="color:green; float:left;"><i class="fa fa-caret-up"></i>&nbsp65 &nbsp</p> <p>Positive Reviews</p>
                <p style="color:red; float:left;"><i class="fa fa-caret-down"></i>&nbsp65 &nbsp</p> <p>Negative Reviews</p>  
              </span>
          
              <span class="chart" style="width: 99px;height: 50px; float:left;">
                <span class="rating">4.0</span>
                    <canvas id="sentichart-0" style="height:47px;"></canvas>
              </span>              
          </div>
          <div class="col-md-3">
            <h5><i class="fa fa-star"></i>&nbsp&nbspRestaurant General</h5>
            <div class="clearfix"></div>
              <p style="color:green; float:left;"><i class="fa fa-caret-up"></i>&nbsp65 &nbsp</p> <p>Positive Reviews</p>
              <p style="color:red; float:left;"><i class="fa fa-caret-down"></i>&nbsp65 &nbsp</p> <p>Negative Reviews</p>
          </div> -->
        </div>
    
    </div>

</div>
</body>

<script data-main="main" src="http://localhost:8080/dashboard2/lib/js/require.js"></script>
</html>