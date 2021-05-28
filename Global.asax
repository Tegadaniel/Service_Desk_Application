<%@ Application Language="VB" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="System.Web.Http" %>
<script runat="server">
    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application startup
        'RouteConfig.RegisterRoutes(RouteTable.Routes)
        RegisterRoutes(RouteTable.Routes)
    End Sub
    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application shutdown
    End Sub
    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when an unhandled error occurs
    End Sub
    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a new session is started
    End Sub
    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a session ends. 
        ' Note: The Session_End event is raised only when the sessionstate mode
        ' is set to InProc in the Web.config file. If session mode is set to StateServer 
        ' or SQLServer, the event is not raised.
    End Sub
    Sub RegisterRoutes(routes As RouteCollection)
        routes.MapPageRoute("login", "login", "~/login/login.aspx")
        routes.MapPageRoute("customer", "customer", "~/customer/customer.aspx")
     End Sub
</script>