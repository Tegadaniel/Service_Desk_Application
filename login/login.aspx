<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title><!-- Google Font: Source Sans Pro -->
    <script src="<%=ResolveClientUrl("~/Scripts/jquery.min.js")%>"></script>
    <script src="<%=ResolveClientUrl("~/Scripts/jquery-1.7.1.js")%>"></script>
     <script src="<%=ResolveClientUrl("~/Scripts/jquery.signalR-2.2.0.js")%>"></script>

   
    <script src="<%=ResolveClientUrl("~/signalr/hubs")%>"></script>

    <script src="<%=ResolveClientUrl("~/login/login.js")%>"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Theme style -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link href="<%=ResolveClientUrl("~/login/style.css")%>" rel = "stylesheet" type="text/css"/>
    <!-- CSS only -->
  </head>
  <body>
 
    
    <div class="container">
      <div class="row">
          <div class="col-lg-3 col-md-2"> </div>
          <div class="col-lg-6 col-md-8 login-box">
              <div class="col-lg-12 login-title">
                 Login Page
              </div>

              <div class="col-lg-12 login-form">
                  <div class="col-lg-12 login-form">
                      <form id="dataform" onsubmit="return false">
                          <div class="form-group">
                              <label class="form-control-label">EMAIL</label>
                              <input type="text" required class="form-control" id="email" placeholder="Email">
                          </div>
                          <div class="form-group">
                              <label class="form-control-label">PASSWORD</label>
                              <input type="password" re class="form-control" id="password" placeholder="Password">
                          </div>
                      </form>
                      <div class="col-lg-6 login-btm login-button">
                        <button type="submit" class="btn btn-outline-primary">LOGIN</button>
                </div>
                  </div>
              </div>
              <div class="col-lg-3 col-md-2"></div>
          </div>
      </div>
    </div>
      <!-- JavaScript Bundle with Popper -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</body>
</html>