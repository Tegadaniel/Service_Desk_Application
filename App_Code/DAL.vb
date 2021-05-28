Imports Microsoft.VisualBasic
Imports Microsoft.ApplicationBlocks.Data
Imports System.Data.SqlClient
Imports System.Data

Public Class DAL
    Dim cn As SqlConnection
    Dim Context As HttpContext = HttpContext.Current
    Public Sub New()
        cn = New SqlConnection(ConnectionString.ConnectionString)

    End Sub

    Public Function userform_action(jsonData As String,actionType As String  ) As DataSet
        Try
            Dim params() As SqlParameter = {New SqlParameter("@JSON_STRING", jsonData),
                                            New SqlParameter("@ACTION_TYPE", actionType)}

            Return SqlHelper.ExecuteDataset(cn, CommandType.StoredProcedure, "SDA_OPERATIONS", params)
        Catch ex As Exception
            BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            Return Nothing
        Finally
            cn.Close()
        End Try
    End Function

    
   
   
End Class
