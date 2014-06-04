<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
mysql_query("insert into table_list (tableName, fieldName) values ('" . $_REQUEST['tableName'] . "','" . $_REQUEST['fieldName'] . "')");
$idArray = mysql_fetch_array(mysql_query("select table_id from table_list where tableName='" . $_REQUEST['tableName'] . "' and fieldName='" . $_REQUEST['fieldName'] . "'"));
echo "addOption('currentFields', '" . $idArray['table_id'] . "','" . $_REQUEST['tableName'] . "-" . $_REQUEST['fieldName'] . "');";
?>