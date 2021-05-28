Imports Microsoft.VisualBasic
Imports Microsoft.AspNet.SignalR
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.IO
Imports System.Data.SqlClient
Imports System.Globalization
Imports System.Drawing

    Public Class Chathub
        Inherits Hub
        Dim DAL As New DAL

        Public Function form_action(jsonData As String,actionType As String) As String
            Dim status As String = "ERROR"
            Dim dc_return As New Dictionary(Of String, Object)
            
            Try
                Dim ds As DataSet = DAL.userform_action(jsonData,actionType)
                Dim dt As DataTable = ds.Tables(0)
                Dim dt2 As DataTable = ds.Tables(1)
                dc_return.Add("RESULT", dt)
                dc_return.Add("OUTPUT", dt2)
                dc_return.Add("ACTION_TYPE", actionType)
                status = "SUCCESS"
            Catch ex As Exception
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            End Try

            dc_return.Add("STATUS", status)
            Clients.All.broadcastMessage(JsonConvert.SerializeObject(dc_return))
            
        End Function

    End Class
